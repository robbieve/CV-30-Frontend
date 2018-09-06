import gql from 'graphql-tag';

export const getJobsQuery = gql`
query jobs($language: LanguageCodeType!) {
    jobs(language: $language) {
        id
        expireDate
        i18n {
            title
            description
        }
        company {
            id
            name
			location
			logoPath
        }
		location
		imagePath
		videoUrl
		status
    }
}
`;

export const getJobQuery = gql`
query job($id: String!, $language: LanguageCodeType!) {
  job(id: $id, language: $language) {
    id
    createdAt
    expireDate
    imagePath
    videoUrl
    status
    i18n {
      title
      description
      idealCandidate
    }
    company {
      id
      name
      jobs {
        id
      }
      i18n {
        description
      }
      officeArticles {
        id
        images {
          id
          path
        }
        videos {
          id
          path
        }
        i18n {
          title
          description
        }
      }
      faqs {
        id
        i18n {
          question
          answer
        }
      }
      owner {
        id
      }
    }
    team {
      id
      name
    }
    phone
    email
    facebook
    linkedin
    applicants {
      id
    }
    location
    skills {
      id
      i18n {
        title
      }
    }
    activityField {
      id
      i18n {
        title
      }
    }
    jobTypes {
      id
      i18n {
        title
      }
    }
    salary {
      amountMin
      amountMax
      currency
      isPublic
    }
    jobBenefits {
      id
      key
      icon
    }
  }
}
`;

export const jobDependencies = gql`
	query jobDependencies($language: LanguageCodeType!) {
		teams(language: $language) {
			id
			name
		}
		jobTypes(language: $language) {
			id
			i18n {
				title
			}
		}
		jobBenefits {
			id
			key
			icon
		}
	}
`;

export const handleJob = gql`
    mutation handleJob($language: LanguageCodeType!, $jobDetails: JobInput!) {
        handleJob(language: $language, jobDetails: $jobDetails) {
            status
            error
        }
    }
`;