import gql from 'graphql-tag';

const profileFollowingData = gql`
    fragment profileFollowingData on Profile {
        followees {
            id
            email
            firstName
            lastName
            hasAvatar
            avatarPath
        }
        followingCompanies {
            id
            name
            industry {
                id
                i18n {
                    title
                }
            }
            logoPath
        }
        followingTeams {
            id
            name
        }
        followingJobs {
            id
            i18n {
                title
            }
        }
    }
`;

const profileAppliedJobsData = gql`
    fragment profileAppliedJobsData on Profile {
        appliedJobs {
            id
            location
            i18n {
                title
            }
            company {
                id
                name
                location
                logoPath
            }
        }
    }
`


export const profileQuery = gql`
query profile($id: String, $language: LanguageCodeType!) {
  profile(id: $id, language: $language) {
    id
    email
    firstName
    lastName
    position
    featuredArticles {
      id
      author {
        id
        email
        firstName
        lastName
      }
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
    aboutMeArticles {
      id
      author {
        id
        email
        firstName
        lastName
      }
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
    skills {
      id
      i18n {
        title
      }
    }
    values {
      id
      i18n {
        title
      }
    }
    experience {
      id
      position
      company
      location
      startDate
      endDate
      isCurrent
      i18n {
        title
        description
      }
      videos {
        id
        path
      }
      images {
        id
        path
      }
    }
    projects {
      id
      position
      company
      location
      i18n {
        title
        description
      }
      startDate
      endDate
      isCurrent
      videos {
        id
        path
      }
      images {
        id
        path
      }
    }
    contact {
      phone
      email
      facebook
      linkedin
    }
    avatarPath
    coverPath
    coverBackground
    story {
      i18n {
        title
        description
      }
    }
    salary {
      amount
      currency
      isPublic
    }
    errors {
      name
      value
      statusCode
    }
    followers {
      id
    }
    ownedCompanies {
      id
      name
      logoPath
      teams {
        id
        name
        coverPath
      }
    }
    ...profileFollowingData
    ...profileAppliedJobsData
  }
}
${profileFollowingData}
${profileAppliedJobsData}
`;

export const updateUserSettingsMutation = gql`
    mutation updateUserSettings($userSettings: UserSettingsInput, $position: String) {
        updateUserSettings(userSettings: $userSettings) {
            status
            error
        }
        setPosition(position: $position) {
            status
            error
        }
    }
`;



export const updateAvatar = gql`
    mutation updateAvatar($status: Boolean, $contentType: ImageType, $path: String) {
        avatar(status: $status, contentType: $contentType, path: $path) {
            status
            error
        }
    }
`;

export const updateCoverMutation = gql`
    mutation updateCoverMutation($status: Boolean, $color: String, $contentType: ImageType, $path: String) {
        profileCover(status: $status, contentType: $contentType, path: $path) {
            status
            error
        }
        setCoverBackground(color: $color) {
            status
            error
        }
    }
`;

export const setSkills = gql`
    mutation setSkills($addSkills: [String!]!, $removeSkills: [String!]!, $language: LanguageCodeType!) {
        setSkills(addSkills: $addSkills, removeSkills: $removeSkills, language: $language) {
            status
            error
        }
    }
`;

export const setValues = gql`
    mutation setValues($addValues: [String!]!, $removeValues: [String!]!, $language: LanguageCodeType!) {
        setValues(addValues: $addValues, removeValues: $removeValues, language: $language) {
            status
            error
        }
    }
`;

export const setExperience = gql`
    mutation setExperience($experience: ExperienceInput!, $language: LanguageCodeType!) {
        setExperience(experience: $experience, language: $language) {
            status
            error
        }
    }
`;

export const setProject = gql`
    mutation setProject($project: ProjectInput!, $language: LanguageCodeType!) {
        setProject(project: $project, language: $language) {
            status
            error
        }
    }
`;

export const setContact = gql`
    mutation setContact($contact: ContactInput) {
        setContact(contact: $contact) {
            status
            error
        }
    }
`;

export const profilesQuery = gql`
    query profiles($language: LanguageCodeType!) {
        profiles(language: $language) {
            id
            email
            firstName
            lastName
            position
            skills {
                id
                i18n {
                    title
                }
            }
            values {
                id
                i18n {
                    title
                }
            }
            aboutMeArticles {
                id
                i18n {
                    title
                }
                images {
                    id
                    path
                }
                videos {
                    id
                    path
                }
            }
            hasAvatar
            avatarContentType
            avatarPath
            errors {
                name
                value
                statusCode
            }
        }
    }
`;

export const setStory = gql`
    mutation setStory($story: StoryInput, $language: LanguageCodeType!) {
        setStory(story: $story, language: $language) {
            status
            error
        }
    }
`;

export const setSalary = gql`
    mutation setSalary($salary: SalaryInput) {
        setSalary(salary: $salary) {
            status
            error
        }
    }
`;

export const setPosition = gql`
mutation setPosition($position: String) {
    setPosition(position: $position) {
        status
        error
    }
}
`;