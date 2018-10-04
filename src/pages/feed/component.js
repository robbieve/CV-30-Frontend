import React from 'react';
import { Grid } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl'
import Loader from '../../components/Loader';
import ArticlesList from './components/articlesList';
import NewPost from './components/newPost';
import NewsFeedSearch from './components/newsFeedSearch';
import Promo from './components/promo';

const NewsFeed = props => {
    const {
        currentProfileQuery: { loading, profile },
        newsFeedArticlesQuery,
        match: { params: { lang } },
        setSearchData, searchData
    } = props;

    if (loading)
        return <Loader />

    const newsFeedArticles = newsFeedArticlesQuery.newsFeedArticles ? newsFeedArticlesQuery.newsFeedArticles.edges.map(edge => edge.node) : [];
    const hasNextPage = newsFeedArticlesQuery.newsFeedArticles ? newsFeedArticlesQuery.newsFeedArticles.pageInfo.hasNextPage : false;

    return (
        <div className='newsFeedRoot'>
            <Grid container className='mainBody brandShow'>
                <Grid item lg={6} md={6} sm={10} xs={11} className='centralColumn'>
                    {(profile && profile.id) && <NewPost refetch={newsFeedArticlesQuery.refetch} profile={profile} />}
                    {(profile && profile.id) &&
                        <section className='profileActions'>
                            <div className='profileAction company'>
                                <h3>
                                    Conecteaza-ti compania cu urmatorul tau angajat
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, eu his scripta perpetua. Falli movet prompta has in...
                                </p>
                                <Link to={`/${lang}/companies/new`} className='profileActionLink'>
                                    Adauga o companie
                                </Link>
                            </div>
                            <div className='profileAction networking'>
                                <h3>
                                    Completeaza-ti proﬁlul pentru Networking!
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, eu his scripta perpetua. Falli movet prompta has in...
                                </p>
                                <Link to={`/${lang}/myProfile/settings`} className='profileActionLink'>
                                    Completeaza-ti proﬁlul
                                </Link>
                            </div>
                            <div className='profileAction jobs'>
                                <h3>
                                    Urmatorul tau job te asteapta.
                                </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, eu his scripta perpetua. Falli movet prompta has in...
                                </p>
                                <Link to={`/${lang}/jobs`} className='profileActionLink'>
                                    Mergi la Joburi
                                </Link>
                            </div>
                        </section>
                    }
                    <section className='articlesList'>
                    {
                        !newsFeedArticlesQuery.loading ?
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={() =>
                                newsFeedArticlesQuery.fetchMore({
                                    variables: {
                                        after: newsFeedArticlesQuery.newsFeedArticles.edges[newsFeedArticlesQuery.newsFeedArticles.edges.length - 1].cursor
                                    },
                                    updateQuery: (previousResult, { fetchMoreResult: { newsFeedArticles: { edges: newEdges, pageInfo} } }) => {
                                        return newEdges.length
                                            ? {
                                                // Put the new articles at the end of the list and update `pageInfo`
                                                newsFeedArticles: {
                                                    __typename: previousResult.newsFeedArticles.__typename,
                                                    edges: [...previousResult.newsFeedArticles.edges, ...newEdges],
                                                    pageInfo
                                                }
                                            }
                                            : previousResult;
                                    }
                                })}
                            hasMore={hasNextPage}
                            loader={<Loader />}
                            useWindow={true}
                        >
                            <ArticlesList articles={newsFeedArticles} />
                        </InfiniteScroll>
                        : <Loader />
                    }
                    </section>
                </Grid>
                <Grid item lg={3} md={3} sm={10} xs={11} className='columnRight'>
                    <div className='columnRightContent'>
                        <div className='fixed'>
                            <NewsFeedSearch searchData={searchData} setSearchData={setSearchData} />
                            <Promo />
                            <section className='links'>
                                <FormattedMessage id="feed.copyRight" defaultMessage="Copyright © 2018 CV30. All rights reserved " description="Copyright">
                                    {(text) => (<p className='copyright'>{ text} </p>)}
                                </FormattedMessage>
                                <FormattedMessage id="feed.aboutUs" defaultMessage="About Us " description="About Us">
                                    {(text) => (<Link to={``}>{text}</Link>)}
                                </FormattedMessage>
                                <FormattedMessage id="feed.termsAndConditions" defaultMessage="Terms and Conditions" description="Terms and Conditions">
                                    {(text) => (<Link to={``}>{text}</Link>)}
                                </FormattedMessage>
                                <FormattedMessage id="feed.qa" defaultMessage="Q&A" description="Q&A">
                                    {(text) => (<Link to={``}>{text}</Link>)}
                                </FormattedMessage>
                            </section>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default NewsFeed;