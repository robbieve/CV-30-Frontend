import React from 'react';
import { Grid, TextField, Button, Checkbox, FormGroup, FormLabel, Switch as ToggleSwitch } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';

import Profile from './components/profile';
import Loader from '../../../components/Loader';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


const UsersList = props => {
    const {
        profilesQuery,
        handleFormChange, handleSliderChange, toggleIsProfileVerified, formData: { isHighSchool, isUniversity, isMasters, isDoctorate, isProfileVerified }
    } = props;

    const profiles = profilesQuery.profiles ? profilesQuery.profiles.edges.map(edge => edge.node) : [];
    const hasNextPage = profilesQuery.profiles ? profilesQuery.profiles.pageInfo.hasNextPage : false;

    return (
        <Grid container className='mainBody userListRoot'>
            <Grid item lg={6} md={6} sm={10} xs={11} className='centralColumn'>
                { !profilesQuery.loading
                    ? <InfiniteScroll
                        pageStart={0}
                        loadMore={() =>
                            profilesQuery.fetchMore({
                                variables: {
                                    after: profilesQuery.profiles.edges[profilesQuery.profiles.edges.length - 1].cursor
                                },
                                updateQuery: (previousResult, { fetchMoreResult: { profiles: { edges: newEdges, pageInfo} } }) => {
                                    return newEdges.length
                                        ? {
                                            // Put the new profiles at the end of the list and update `pageInfo`
                                            profiles: {
                                                __typename: previousResult.profiles.__typename,
                                                edges: [...previousResult.profiles.edges, ...newEdges],
                                                pageInfo
                                            }
                                        }
                                        : previousResult;
                                }
                            })}
                        hasMore={hasNextPage}
                        loader={<Loader key='loader'/>}
                        useWindow={true}
                    >
                        {profiles.map(user => <Profile user={user} key={user.id} />)}
                    </InfiniteScroll>
                    : <Loader />
                }
            </Grid>
            <Grid item lg={3} md={3} sm={10} xs={11} className='columnRight'>
                <div className='columnRightContent'>
                    <h2 className="columnTitle">
                        Find <b>people</b>
                    </h2>
                    <div className='filters'>
                        <section className='advanced'>
                            <TextField
                                name='name'
                                label='Name'
                                placeholder='Search by name...'
                                type="search"
                                className='textField'
                            />
                            <TextField
                                name='city'
                                label='City'
                                placeholder='Search by city...'
                                type="search"
                                className='textField'
                            />
                            <TextField
                                name='hSkill'
                                label='Hard skills'
                                placeholder='Search by hard skills...'
                                type="search"
                                className='textField'
                            />
                            <TextField
                                name='sSkill'
                                label='Soft skills'
                                placeholder='Search by soft skills...'
                                type="search"
                                className='textField'
                            />
                            <TextField
                                name='company'
                                label='Company'
                                placeholder='Search by company...'
                                type="search"
                                className='textField'
                            />
                        </section>

                        <section className='educationType'>
                            <p className='sectionTitle'>Education</p>
                            <label htmlFor="isHighSchool">
                                <Checkbox
                                    id='isHighSchool'
                                    name='isHighSchool'
                                    checked={isHighSchool}
                                    onChange={handleFormChange}
                                    className='hiddenInput'
                                />
                                <Button component='span' className={isHighSchool ? 'checkboxBtn active' : 'checkboxBtn'}>
                                    HighSchool
                                </Button>
                            </label>
                            <label htmlFor="isUniversity">
                                <Checkbox
                                    id='isUniversity'
                                    name='isUniversity'
                                    checked={isUniversity}
                                    onChange={handleFormChange}
                                    className='hiddenInput'
                                />
                                <Button component='span' className={isUniversity ? 'checkboxBtn active' : 'checkboxBtn'}>
                                    University
                                </Button>
                            </label>
                            <label htmlFor="isMasters">
                                <Checkbox
                                    id='isMasters'
                                    name='isMasters'
                                    checked={isMasters}
                                    onChange={handleFormChange}
                                    className='hiddenInput'
                                />
                                <Button component='span' className={isMasters ? 'checkboxBtn active' : 'checkboxBtn'}>
                                    Master's Degree
                                </Button>
                            </label>
                            <label htmlFor="isDoctorate">
                                <Checkbox
                                    id='isDoctorate'
                                    name='isDoctorate'
                                    checked={isDoctorate}
                                    onChange={handleFormChange}
                                    className='hiddenInput'
                                />
                                <Button component='span' className={isDoctorate ? 'checkboxBtn active' : 'checkboxBtn'}>
                                    Doctorate Degree
                                </Button>
                            </label>
                        </section>
                        <section className='endorsment'>
                            <p className='sectionTitle'>Endorsment level</p>
                            <Range min={100} max={300} defaultValue={[100, 300]} step={10} onChange={handleSliderChange} />
                        </section>
                        <section className='verifiedProfile'>
                            <p className='sectionTitle'>Profile</p>
                            <FormGroup row className='profileToggle'>
                                <FormLabel className={isProfileVerified ? 'active' : ''}>Verified</FormLabel>
                                <ToggleSwitch checked={isProfileVerified} onChange={toggleIsProfileVerified}
                                    classes={{
                                        switchBase: 'colorSwitchBase',
                                        checked: 'colorChecked',
                                        bar: 'colorBar',
                                    }}
                                    color="primary" />
                                <FormLabel className={!isProfileVerified ? 'active' : ''}>Not verified</FormLabel>
                            </FormGroup>
                        </section>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}

export default UsersList;