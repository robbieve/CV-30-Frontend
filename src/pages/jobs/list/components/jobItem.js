import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, CircularProgress, Chip } from '@material-ui/core';
import { defaultCompanyLogo } from '../../../../constants/utils';

const JobItem = props => {
    const { i18n, company: { name: companyName, location }, expireDate, videos, images, id } = props;
    // TODO: appliedDate, jobLevel, benefits from props
    const match = Math.random() * 100;
    const appliedDate = new Date(2018, Math.random() * 7, Math.random()*31).toLocaleDateString();
    const jobLevels = ['entry', 'mid', 'senior'];
    const benefits = [
        {
            icon: 'fas fa-car',
            label: 'Car'
        },
        {
            icon: 'fas fa-mobile-alt',
            label: 'Phone'
        }, {
            icon: 'fas fa-laptop',
            label: 'Laptop'
        }
    ];
    const { title, description } = i18n[0];

    return (
        <div className='listItem jobListItem'>
            <div className='leftOverlay'>
                <Link to={`/dashboard/job/${id}`}>
                    <Avatar alt="Gabriel" src={ defaultCompanyLogo } className='avatar' style={{ margin: 3, backgroundColor: '#fff' }} imgProps={{ style: { objectFit: 'contain' } }} />
                </Link>
                <div className='leftOverlayTexts'>
                    <h6 className='companyName'>
                        {companyName}
                    </h6>
                    <p className='expires'>Expires on: <span>{new Date(expireDate).toLocaleDateString()}</span></p>
                </div>
            </div>
            <div className='rightOverlay'>
                <div className='location'>
                    <i className='fas fa-lg fa-map-marker-alt' />
                    {location}
                </div>
                <div className='match'>
                    <CircularProgress
                        variant='static'
                        size={80}
                        value={match}
                        classes={{
                            root: 'matchRoot'
                        }}
                    />
                    <span className='matchValue'>
                        {match.toFixed(0)}%
                        <br />
                        <span className='matchText'>
                            match
                        </span>
                    </span>
                </div>
            </div>
            {
                appliedDate &&
                <span className='appliedDate'>Applied:&nbsp;<b>{appliedDate}</b></span>
            }
            <div className='itemBody'>
                {
                    ((videos && videos.length) || (images && images.length)) &&
                    <div className='media'>

                    </div>
                }
                <div className='details'>
                    <h2 className='jobTitle'>{title}</h2>
                    <div className='levels'>
                        {jobLevels && jobLevels.map(item => <Chip className='jobLevel' label={item} key={item} />)}
                    </div>
                    <div className='benefits'>
                        {benefits && benefits.map(item => (
                            <div className='benefit' key={item.label}>
                                <i className={item.icon} />
                                {item.label}
                            </div>
                        ))}
                    </div>
                    <p className='companyDescription'>
                        {description}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default JobItem;