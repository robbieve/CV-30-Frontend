import React from 'react';

import { Grid, Avatar, Button, Icon, Hidden, IconButton, Chip } from '@material-ui/core';

import { compose, pure, withState, withHandlers } from "recompose";
import { FormattedMessage } from 'react-intl';
import { NavLink, withRouter } from 'react-router-dom';

import ColorPicker from './colorPicker';
import SkillsEditor from './skillsEditor';

import slider from '../../../../hocs/slider';


const Header = (props) => {
    const { editMode, data,
        uploadImage, closeColorPicker, toggleColorPicker, colorPickerAnchor, removeStory,
        activeItem, prevItem, jumpToItem, nextItem,
        openSkillsModal,
        skillsModalData,
        skillsAnchor,
        closeSkillsModal,
        headerStories
    } = props;
    const {
        availableColors,
        softSkills,
        values,
    } = data;
    const lang = props.match.params.lang;

    return (
        <div className='header'>
            <Grid container className='headerLinks'>
                <Grid item md={3} sm={12} xs={12} className='userAvatar'>
                    <Avatar alt="Gabriel" src="http://digitalspyuk.cdnds.net/17/25/980x490/landscape-1498216547-avatar-neytiri.jpg" className='avatar' />
                    {editMode &&
                        <React.Fragment>
                            <label htmlFor="fileUpload">
                                <input
                                    accept="image/*"
                                    className='hiddenInput'
                                    id="fileUpload"
                                    name="fileUpload"
                                    multiple
                                    type="file"
                                    onChange={uploadImage}
                                />
                                <Button component="span" className='badgeRoot'>
                                    <Icon>
                                        camera_alt
                                </Icon>
                                </Button>
                            </label>

                            <ColorPicker colorPickerAnchor={colorPickerAnchor} onClose={closeColorPicker} availableColors={availableColors} />
                        </React.Fragment>
                    }
                    <div className='avatarTexts'>
                        <h3>Gabriel</h3>
                        <h4>Manager</h4>
                        {editMode &&
                            <Button size='small' className='colorPickerButton' disableRipple={true} onClick={toggleColorPicker}>
                                <span className='text'>Change Background</span>
                                <Icon className='icon'>brush</Icon>
                            </Button>
                        }
                    </div>
                </Grid>
                <Grid item md={3} sm={12} xs={12} className='userLinks'>
                    <FormattedMessage id="userProfile.profile" defaultMessage="Profile" description="User header profile link">
                        {(text) => (
                            <Button component={NavLink} exact to={`/${lang}/dashboard/profile`} className='headerLink'>
                                {text}
                            </Button>
                        )}
                    </FormattedMessage>

                    <FormattedMessage id="userProfile.feed" defaultMessage="Feed" description="User header feed link">
                        {(text) => (
                            <Button component={NavLink} exact to={`/${lang}/dashboard/profile/feed/`} className='headerLink'>
                                {text}
                            </Button>
                        )}
                    </FormattedMessage>

                    <FormattedMessage id="userProfile.follow" defaultMessage="Follow" description="User header follow button">
                        {(text) => (
                            <Button className='headerButton'>
                                {text}
                            </Button>
                        )}
                    </FormattedMessage>

                </Grid>
            </Grid>

            <Grid container className='headerStories' spacing={8}>
                <Hidden smDown>
                    {
                        headerStories.map((story, index) => (
                            <Grid item className='storyContainer' key={`headerStory-${index}`}>
                                <img src={story.img} alt="ceva" className='storyImg' />
                                <span className='storyTitle'>{story.title}</span>
                                {
                                    editMode &&
                                    <Button
                                        variant='fab'
                                        size='small'
                                        onClick={() => removeStory(index)}
                                        classes={{
                                            fab: 'removeStoryBtn'
                                        }}
                                    >
                                        <Icon>close</Icon>
                                    </Button>
                                }
                            </Grid>
                        ))
                    }
                    {
                        editMode &&
                        <Grid item className='storyContainer add'>
                            <span className='bigPlus'>+</span>
                            <span className='storyTitle'>+ Add story</span>
                        </Grid>
                    }
                </Hidden>

                <Hidden mdUp>
                    <div className='storySliderContainer'>
                        <div className='storiesSlider'>
                            {
                                headerStories.map((story, index) => {
                                    let itemClass = index === activeItem ? 'storyItem active' : 'storyItem';
                                    return (
                                        <div className={itemClass} key={`headerStory-${index}`}>
                                            <img src={story.img} alt="ceva" className='storyImg' />
                                            <span className='storyTitle'>{story.title}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='storySliderControls'>
                        <IconButton className='sliderArrow' onClick={prevItem}>
                            <Icon>arrow_back_ios</Icon>
                        </IconButton>
                        {
                            headerStories.map((item, index) => {
                                return (<span className={index === activeItem ? 'sliderDot active' : 'sliderDot'} key={`storyMarker-${index}`} onClick={() => jumpToItem(index)}></span>)
                            })
                        }
                        <IconButton className='sliderArrow' onClick={nextItem}>
                            <Icon>arrow_forward_ios</Icon>
                        </IconButton>
                    </div>
                </Hidden>
            </Grid>

            <Grid container className='headerSkills'>
                <Grid item lg={8} md={8} sm={12} xs={12} className={editMode ? 'skillsContainer edit' : 'skillsContainer'}>
                    <div className='skillsWrapper'>
                        <FormattedMessage id="userProfile.softSkills" defaultMessage="Soft skills" description="User header soft skills">
                            {(text) => (<span className='headerSkillsTitle softSkills'>{text}:</span>)}
                        </FormattedMessage>
                        {!editMode &&
                            softSkills.map((item, index) => <Chip label={item} className='chip skills' key={`softSkill-${index}`} />)
                        }
                        {
                            editMode &&
                            <span>{softSkills.join(', ')}</span>
                        }
                        {
                            editMode &&
                            <Button
                                variant='fab'
                                size='small'
                                color='primary'
                                onClick={(event) => openSkillsModal('skills', event.target)}
                                classes={{
                                    fab: 'circleEditBtn'
                                }}
                            >
                                <Icon>edit</Icon>
                            </Button>
                        }
                    </div>
                </Grid>
                <Grid item lg={8} md={8} sm={12} xs={12} className={editMode ? 'skillsContainer edit' : 'skillsContainer'}>
                    <div className='skillsWrapper'>
                        <FormattedMessage id="userProfile.values" defaultMessage="Values" description="User header values">
                            {(text) => (<span className='headerSkillsTitle values'>{text}:</span>)}
                        </FormattedMessage>
                        {!editMode &&
                            values.map((item, index) => <Chip label={item} className='chip values' key={`value-${index}`} />)
                        }
                        {
                            editMode &&
                            <span>{values.join(', ')}</span>
                        }
                        {
                            editMode &&
                            <Button
                                variant='fab'
                                size='small'
                                color='primary'
                                onClick={(event) => openSkillsModal('values', event.target)}
                                classes={{
                                    fab: 'circleEditBtn'
                                }}
                            >
                                <Icon>edit</Icon>
                            </Button>
                        }
                    </div>
                </Grid>
                <SkillsEditor skillsModalData={skillsModalData} skillsAnchor={skillsAnchor} closeSkillsModal={closeSkillsModal} key={skillsModalData} />
            </Grid>
        </div>
    )
}

const HeaderHOC = compose(
    withRouter,
    withState('headerStories', 'setHeaderStories', ({ data }) => data.headerStories || []),
    withState('count', 'setCount', ({ data }) => data.headerStories.length - 1),
    withState('colorPickerAnchor', 'setColorPickerAnchor', null),
    withState('skillsAnchor', 'setSkillsAnchor', null),
    withState('skillsModalData', 'setSkillsModalData', null),
    withHandlers({
        toggleColorPicker: ({ setColorPickerAnchor }) => (event) => {
            setColorPickerAnchor(event.target);
        },
        closeColorPicker: ({ setColorPickerAnchor }) => () => {
            setColorPickerAnchor(null);
        },
        openSkillsModal: ({ softSkills, values, setSkillsAnchor, setSkillsModalData }) => (type, target) => {
            if (type === 'values')
                setSkillsModalData(values);
            if (type === 'skills')
                setSkillsModalData(softSkills);
            setSkillsAnchor(target);
        },
        closeSkillsModal: ({ setSkillsAnchor }) => () => {
            setSkillsAnchor(null);
        },
        uploadImage: () => () => { },
        removeStory: ({ headerStories, setHeaderStories }) => index => {
            let stories = [...headerStories];
            stories.splice(index, 1);
            setHeaderStories(stories);
        }
    }),
    slider,
    pure

);
export default HeaderHOC(Header);