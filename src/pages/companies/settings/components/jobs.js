import React from 'react';

import JobItem from '../../../jobs/list/components/jobItem';

const JobsList = props => {
    const { currentCompany: { company }} = props;
    const { jobs } = company;
    return (
        <div className='jobsList'>
            {jobs && jobs.map(job => (
                <JobItem
                    key={job.id} 
                    company={company}
                    job={job}
                />))}
        </div>
    );
}

export default JobsList;