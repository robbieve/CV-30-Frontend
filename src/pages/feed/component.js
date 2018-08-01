import React from 'react';
import { Grid, Button, Icon, Avatar, TextField, FormGroup, FormLabel, Switch as ToggleSwitch, IconButton } from '@material-ui/core';
import { defaultUserAvatar } from '../../constants/utils';
import { s3BucketURL, profilesFolder } from '../../constants/s3';
import Loader from '../../components/Loader';
import ArticlesList from './components/articlesList';
import { Redirect, Link } from 'react-router-dom';

const NewsFeed = props => {
    const {
        formData, handleFormChange, switchIsArticle, isArticle,
        currentUser: { loading, profile },
        newsFeedArticlesQuery,
        match: { params: { lang } },
        addPost
    } = props;

    if (loading || newsFeedArticlesQuery.loading)
        return <Loader />

    if (isArticle)
        return <Redirect to={`/${lang}/articles/new`} />;

    const { id, firstName, lastName, email, hasAvatar, avatarContentType } = profile || {};
    const { postBody } = formData;
    let avatar = hasAvatar ? `${s3BucketURL}/${profilesFolder}/${id}/avatar.${avatarContentType}` : null;
    let fullName = (firstName && lastName) ? `${firstName} ${lastName}` : email;
    const followingArticles = newsFeedArticlesQuery.newsFeedArticles ? newsFeedArticlesQuery.newsFeedArticles.following : [];

    return (
        <div className='newsFeedRoot'>
            <Grid container className='mainBody brandShow'>
                <Grid item lg={6} md={6} sm={10} xs={11} className='centralColumn'>
                    {id &&
                        <section className='newPost'>
                            <div className='postHeader'>
                                <div className='userProfile'>
                                    <Avatar
                                        className='userAvatar'
                                        src={avatar || defaultUserAvatar}
                                        alt='userAvatar'
                                        imgProps={{ style: { objectFit: 'contain' } }}
                                        style={{ backgroundColor: '#fff', margin: 3 }} />
                                    <span className='postAs'>
                                        Post as:
                                        <span className='userName'>{fullName}</span>
                                    </span>
                                </div>
                                <Button className='mediaButton'>
                                    <Icon className='icon'>
                                        camera_alt
                                </Icon>
                                    + Photo / Video
                            </Button>
                            </div>
                            <div className='postBody'>
                                <TextField
                                    name="postBody"
                                    placeholder="Say something..."
                                    fullWidth
                                    className='textField'
                                    onChange={handleFormChange}
                                    value={postBody}
                                    type='text'
                                    multiline
                                    rows={1}
                                    rowsMax={10}
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                />
                            </div>
                            <div className='postFooter'>
                                <FormGroup className='footerToggle'>
                                    <FormLabel className={!isArticle ? 'active' : ''}>Post</FormLabel>
                                    <ToggleSwitch checked={isArticle} onChange={switchIsArticle}
                                        classes={{
                                            switchBase: 'colorSwitchBase',
                                            checked: 'colorChecked',
                                            bar: 'colorBar',
                                        }}
                                        color="primary" />
                                    <FormLabel className={isArticle ? 'active' : ''}>Article</FormLabel>
                                </FormGroup>
                                <Button className='postBtn' onClick={addPost}>
                                    Post
                                </Button>
                            </div>
                        </section>
                    }
                    {id &&
                        <section className='profileActions'>
                            <div className='profileAction'>
                                <h3>
                                    Conecteaza-ti compania cu urmatorul tau angajat
                            </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, eu his scripta perpetua. Falli movet prompta has in...
                            </p>

                                <Button className='profileActionBtn'>
                                    Adauga o companie
                            </Button>
                            </div>
                            <div className='profileAction'>
                                <h3>
                                    Conecteaza-ti compania cu urmatorul tau angajat
                            </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, eu his scripta perpetua. Falli movet prompta has in...
                            </p>
                                <Button className='profileActionBtn'>
                                    Adauga o companie
                            </Button>
                            </div>
                            <div className='profileAction'>
                                <h3>
                                    Conecteaza-ti compania cu urmatorul tau angajat
                            </h3>
                                <p>
                                    Lorem ipsum dolor sit amet, eu his scripta perpetua. Falli movet prompta has in...
                            </p>
                                <Button className='profileActionBtn'>
                                    Adauga o companie
                            </Button>
                            </div>
                        </section>
                    }
                    <section className='articlesList'>
                        <ArticlesList articles={followingArticles} />
                    </section>
                </Grid>
                <Grid item lg={3} md={3} sm={10} xs={11} className='columnRight'>
                    <div className='columnRightContent'>
                        <section className='searchFields'>
                            <TextField
                                name='generalSearch'
                                label='Keywords, people or companies'
                                placeholder='Search for keywords, people or companies...'
                                type="search"
                                className='textField'
                                fullWidth
                            />
                            <TextField
                                name='hastags'
                                label='#hashtags'
                                placeholder='Search for hastags...'
                                type="search"
                                className='textField'
                                fullWidth
                            />
                        </section>
                        <section className='promo'>
                            <span>Promo</span>
                        </section>
                        <section className='links'>
                            <p className='copyright'>Copyright © 2018 CV30. All rights reserved </p>
                            <Link to={``}>About Us</Link>
                            <Link to={``}>Terms and Conditions</Link>
                            <Link to={``}>Q&A</Link>
                        </section>
                    </div>
                </Grid>
            </Grid>
        </div>
    );

}

export default NewsFeed;