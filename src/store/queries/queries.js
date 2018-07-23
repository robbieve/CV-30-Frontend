import gql from 'graphql-tag';



export const updateUserSettingsMutation = gql`
    mutation updateUserSettings($userSettings: UserSettingsInput) {
        updateUserSettings(userSettings: $userSettings) {  
            status
        }
    }
`;

export const currentProfileQuery = gql`
  query currentUser($id: String, $language: LanguageCodeType!) {
  profile(id: $id, language: $language) {
    id
    email
    firstName
    lastName
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
    hasAvatar
    avatarContentType
    hasProfileCover
    profileCoverContentType
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
    followingCompanies {
        id
    }
    followingJobs {
        id
    }
    followingTeams {
        id
    }
  }
}
`;

export const updateAvatar = gql`
    mutation updateAvatar($status: Boolean!, $contentType: ImageType!){
        avatar(status: $status, contentType: $contentType){
           status
        }
    }
`;

export const updateGoogleMapsMutation = gql`
    mutation updateGoogleMaps($isLoaded: Boolean!){
        updateGoogleMaps(isLoaded: $isLoaded) @client{
            googleMaps {
               __typename
               isLoaded
           }
        }
    }
`;

export const googleMapsQuery = gql`
    query googleMapsData{
        googleMaps @client {
            isLoaded
        }
    }
`;

export const updateAvatarTimestampMutation = gql`
    mutation updateAvatarTimestamp($timestamp: Int!){
        updateAvatarTimestamp(timestamp: $timestamp) @client{
           localUser {
               __typename
               timestamp
           }
        }
    }
`;

export const localUserQuery = gql`
    query localUserQuery {
        localUser @client {
            timestamp
        }
    }
`;


export const getCurrentUser = gql`
    query getCurrentUser {
        auth @client {
             __typename
            currentUser {
                id
                firstName
                lastName
                email
                hasAvatar
                avatarContentType
                 __typename
            }
        }
    }
`;

export const updateCoverMutation = gql`
    mutation updateCoverMutation($status: Boolean, $color: String, $contentType: ImageType) {
        profileCover(status: $status, contentType: $contentType) {
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
    mutation setSkills($skills: [String!]!, $language: LanguageCodeType!) {
        setSkills(skills: $skills, language: $language) {
            status
            error
        }
    }
`;

export const removeSkill = gql`
    mutation removeSkill($id: Int) {
        removeSkill(id: $id){
            status
            error
        }
    }
`;

export const setValues = gql`
    mutation setValues($values: [String!]!, $language: LanguageCodeType!) {
        setValues(values: $values, language: $language) {
            status
            error
        }
    }
`;

export const removeValue = gql`
    mutation removeValue($id: Int) {
        removeValue(id: $id){
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

export const getArticles = gql`
    query articles($language: LanguageCodeType!) {
        articles(language: $language) {
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
            created_at
            updated_at
        }
    }
`;

export const handleArticle = gql`
    mutation handleArticle($language: LanguageCodeType!, $article: ArticleInput, $options: ArticleOptions) {
        handleArticle(language: $language, article: $article, options: $options) {
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

export const handleFollower = gql`
    mutation handleFollower($details: FollowerInput!) {
        handleFollower(details: $details) {
            status
            error
        }
    }
`;