import React from 'react';
import { Grid, Hidden, IconButton, Icon, Button, FormGroup, FormLabel, Switch as ToggleSwitch, Snackbar } from '@material-ui/core';
import { compose, withState, withHandlers, pure } from 'recompose';
import { graphql } from 'react-apollo';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';
import FroalaEditor from 'react-froala-wysiwyg';

import ColorPicker from './colorPicker';
import { s3BucketURL } from '../../../constants/s3';
import { defaultHeaderOverlay } from '../../../constants/utils';
import { handleLandingPage, landingPage } from '../../../store/queries';
import Feedback from '../../../components/Feedback';

const HeaderHOC = compose(
    graphql(handleLandingPage, { name: 'handleLandingPage' }),
    withState('headline', 'setHeadline', props => {
        let { landingPage: { landingPage: { i18n } } } = props;
        return (i18n && i18n[0] && i18n[0].headline) ? i18n[0].headline : '';
    }),
    withState('colorPickerAnchor', 'setColorPickerAnchor', null),
    withState('forceCoverRender', 'setForceCoverRender', 0),
    withState('feedbackMessage', 'setFeedbackMessage', null),
    withHandlers({
        toggleColorPicker: ({ setColorPickerAnchor }) => (event) => {
            setColorPickerAnchor(event.target);
        },
        closeColorPicker: ({ setColorPickerAnchor }) => () => {
            setColorPickerAnchor(null);
        },
        updateHeadline: ({ setHeadline }) => text => {
            setHeadline(text)
        },
        submitHeadline: ({ headline, handleLandingPage, match: { params: { lang: language } }, setFeedbackMessage }) => async () => {
            try {
                await handleLandingPage({
                    variables: {
                        language,
                        details: {
                            headline
                        }
                    },
                    refetchQueries: [{
                        query: landingPage,
                        fetchPolicy: 'network-only',
                        name: 'landingPage',
                        variables: {
                            language
                        }
                    }]
                });
                setFeedbackMessage({ type: 'success', message: 'Changes saved successfully.' });
            }
            catch (err) {
                console.log(err);
                setFeedbackMessage({ type: 'error', message: err.message });
            }
        },
        refetchBgImage: ({ setForceCoverRender }) => () => setForceCoverRender(Date.now()),
        closeFeedback: ({ setFeedbackMessage }) => () => setFeedbackMessage(null)
    }),
    pure
);

const Header = props => {
    const {
        editMode, switchEditMode,
        feedbackMessage, closeFeedback,
        headline, updateHeadline, submitHeadline,
        toggleColorPicker, closeColorPicker, colorPickerAnchor, refetchBgImage, forceCoverRender,
        landingPage: { landingPage: { coverBackground, coverContentType, hasCover } }
    } = props;

    let headerStyle = null;

    if (coverBackground) {
        headerStyle = { background: coverBackground }
    } else {
        headerStyle = { background: defaultHeaderOverlay }
    }

    if (hasCover) {
        let newCover = `${s3BucketURL}/landingPage/headerCover.${coverContentType}?${forceCoverRender}`;
        headerStyle.background += `, url(${newCover})`;
    }
    return (
        <div className='header' style={headerStyle}>
            <FormGroup row className='editToggle'>
                <FormLabel className={!editMode ? 'active' : ''}>View</FormLabel>
                <ToggleSwitch checked={editMode} onChange={switchEditMode}
                    classes={{
                        switchBase: 'colorSwitchBase',
                        checked: 'colorChecked',
                        bar: 'colorBar',
                    }}
                    color="primary" />
                <FormLabel className={editMode ? 'active' : ''}>Edit</FormLabel>
            </FormGroup>
            {
                editMode &&
                <React.Fragment>
                    <Button size='small' className='colorPickerButton' disableRipple onClick={toggleColorPicker}>
                        <span className='text'>Change Background</span>
                        <Icon className='icon'>brush</Icon>
                    </Button>
                    <ColorPicker
                        colorPickerAnchor={colorPickerAnchor}
                        onClose={closeColorPicker}
                        refetchBgImage={refetchBgImage}
                        type='header'
                    />
                </React.Fragment>
            }
            <Grid container className='headlineContainer'>
                <Grid item md={5} sm={12} xs={12}>
                    {
                        editMode ?
                            <div className='editorWrapper'>
                                <FroalaEditor
                                    config={{
                                        placeholderText: 'This is where the company headline should be',
                                        iconsTemplate: 'font_awesome_5',
                                        toolbarInline: true,
                                        charCounterCount: false,
                                        toolbarButtons: ['bold', 'italic', 'underline', 'strikeThrough', 'fontFamily', 'fontSize', 'color', '-', 'paragraphFormat', 'align', 'formatOL', 'indent', 'outdent', '-', 'undo', 'redo']
                                    }}
                                    model={headline}
                                    onModelChange={updateHeadline}
                                />
                                <IconButton className='submitBtn' onClick={submitHeadline}>
                                    <Icon>done</Icon>
                                </IconButton>
                            </div>
                            : <span dangerouslySetInnerHTML={{ __html: headline }} />
                    }
                </Grid>
                <Hidden mdDown>
                    <Grid item md={5} sm={12} xs={12}></Grid>
                </Hidden>
            </Grid>
            {feedbackMessage &&
                <Feedback
                    handleClose={closeFeedback}
                    {...feedbackMessage}
                />
            }
        </div>
    );
};

export default HeaderHOC(Header);