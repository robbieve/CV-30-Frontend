import React from 'react';
import ReactPlayer from 'react-player';
import { Grid, Avatar, Button, Chip, Hidden, Icon, IconButton } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { compose, withState, withHandlers, pure } from 'recompose';
import { NavLink, Link } from 'react-router-dom';
// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';

import ArticlePopup from '../../../../components/ArticlePopup';
import AddTeam from './addTeam';

const Header = (props) => {
    const { headline, updateHeadline, match, headerStories, editMode, removeStory, toggleStoryEditor, closeStoryEditor, isPopUpOpen, companyQuery: { company } } = props;
    const { lang, companyId } = match.params;

    return (
        <div className='header'>
            <Hidden smDown>
                <ReactPlayer
                    url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                    width='100%'
                    height='100%'
                    config={{
                        youtube: {
                            playerVars: {
                                showinfo: 0,
                                controls: 0,
                                modestbranding: 1,
                                loop: 1
                            }
                        }
                    }}
                    playing={false}
                // style={{ pointerEvents: 'none' }}
                />

                <div className='headerOverlay'></div>
            </Hidden>
            <div className='headerContents'>
                <Grid container className='headerLinks'>
                    <Grid item lg={3} md={5} sm={12} xs={12} className='userAvatar'>
                        <Avatar alt="John" src="http://digitalspyuk.cdnds.net/17/25/980x490/landscape-1498216547-avatar-neytiri.png" className='avatar' />
                        <div className='avatarTexts'>
                            <h3>{company.name}</h3>
                            <h4>Companie de bauturi</h4>
                        </div>
                        {editMode &&
                            <IconButton className='companySettingsBtn' component={Link} to={`/${lang}/dashboard/company/${companyId}/settings`}>
                                <Icon>settings</Icon>
                            </IconButton>
                        }
                    </Grid>
                    <Grid item lg={3} md={5} sm={12} xs={12} className='rightHeaderLinks'>
                        <FormattedMessage id="headerLinks.profile" defaultMessage="Profile" description="User header profile link">
                            {(text) => (
                                <Button component={NavLink} exact to={`/${lang}/dashboard/company/${companyId}`} className='headerLink'>
                                    {text}
                                </Button>
                            )}
                        </FormattedMessage>

                        <FormattedMessage id="headerLinks.feed" defaultMessage="Feed" description="User header feed link">
                            {(text) => (
                                <Button component={NavLink} exact to={`/${lang}/dashboard/company/${companyId}/feed/`} className='headerLink'>
                                    {text}
                                </Button>
                            )}
                        </FormattedMessage>

                        <FormattedMessage id="headerLinks.follow" defaultMessage="Follow" description="User header follow button">
                            {(text) => (
                                <Button className='headerButton'>
                                    {text}
                                </Button>
                            )}
                        </FormattedMessage>

                    </Grid>
                </Grid>
                <Grid container className='headerInfoContainer' style={{ pointerEvents: 'all' }}>
                    <Grid item lg={5} md={5} sm={12} xs={12} className='textInfo'>
                        <FroalaEditor
                            config={{
                                placeholderText: 'This is where the company headline should be',
                                iconsTemplate: 'font_awesome_5',
                                toolbarInline: true,
                                charCounterCount: false,
                                toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', 'color', 'emoticons', '-', 'paragraphFormat', 'align', 'formatOL', 'indent', 'outdent', '-', 'undo', 'redo']
                            }}
                            model={headline}
                            onModelChange={updateHeadline}
                        />
                    </Grid>
                </Grid>
                <Grid container className='headerStories'>
                    {
                        headerStories.map((story, index) => {
                            return (
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
                            )
                        })
                    }
                    {
                        editMode &&
                        <Grid item className='storyContainer add' onClick={(event) => toggleStoryEditor(event.target)}>
                            <span className='bigPlus'>+</span>
                            <span className='storyTitle'>+ Add featured article</span>
                        </Grid>
                    }
                    <ArticlePopup
                        open={isPopUpOpen}
                        onClose={closeStoryEditor}
                    />

                </Grid>
                <Grid container className='activityFields'>
                    <Chip label={company.activityField} className='chip activity' />
                    <Chip label={company.location} className='chip activity' />
                    <Chip label={company.noOfEmployees} className='chip activity' />
                </Grid>

                <Grid container className='teamSlider'>
                    <Grid item className='teamSliderItem title'>
                        <h4>Cunoaste <b>echipa</b></h4>
                        {editMode && <AddTeam {...props} />}
                    </Grid>
                    {
                        headerStories.map((story, index) => {
                            let url = `/${lang}/dashboard/company/team`; //will add params for company id and team id
                            return (
                                <Link to={url} className='teamSliderItem' key={`teamSliderItem-${index}`}>
                                    <img src={story.img} alt="ceva" className='teamImg' />
                                    <span className='teamText'>{story.title}</span>
                                </Link>
                            )
                        })
                    }

                </Grid>
            </div>
        </div>
    )
}

const HeaderHOC = compose(
    withState('keyWords', 'setHeaderKeywords', ({ companyQuery: { company } }) => [company.activityField]),
    withState('headerStories', 'setHeaderStories', ({ companyQuery: { company } }) => company.featuredArticles),
    withState('isPopUpOpen', 'setIsPopUpOpen', false),
    withState('count', 'setCount', ({ companyQuery: { company } }) => company.featuredArticles.length - 1),
    withState('expanded', 'updateExpanded', null),
    withState('headline', 'setHeadline', ''),
    withHandlers({
        updateHeadline: ({ setHeadline }) => (text) => setHeadline(text),
        expandPanel: ({ updateExpanded }) => (panel) => (ev, expanded) => {
            updateExpanded(expanded ? panel : false);
        },
        removeStory: ({ headerStories, setHeaderStories }) => (index) => {
            let stories = [...headerStories];
            stories.splice(index, 1);
            setHeaderStories(stories);
        },
        toggleStoryEditor: ({ setIsPopUpOpen }) => () => {
            setIsPopUpOpen(true);
        },
        closeStoryEditor: ({ setIsPopUpOpen }) => () => {
            setIsPopUpOpen(false);
        }
    }),
    pure
)

export default HeaderHOC(Header);