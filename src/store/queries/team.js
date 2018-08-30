import gql from 'graphql-tag';

export const handleTeam = gql`
    mutation handleTeam($teamDetails: TeamInput!) {
        handleTeam(teamDetails: $teamDetails) {
            status
            error
        }
    }
`;

export const queryTeam = gql`
query team($id: String!, $language: LanguageCodeType!) {
  team(id: $id, language: $language) {
    id
    name
    company {
      id
      name
      owner {
        id
      }
    }
    members {
      id
      firstName
      lastName
      email
      avatarPath
    }
    shallowMembers {
      id
      firstName
      lastName
      email
      position
      avatarPath
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
    jobs {
      id
      name
      expireDate
      i18n {
        title
        description
      }
    }
    coverBackground
    coverPath
  }
}
`;

export const handleTeamMember = gql`
    mutation handleTeamMember($teamId: String!, $memberId: String!, $add: Boolean) {
        handleTeamMember(teamId: $teamId, memberId: $memberId, add: $add) {
            status
            error
        }
    }
`;

export const teamsQuery = gql`
    query teams($language: LanguageCodeType!) {
        teams(language: $language) {
            id
            name
        }
    }
`;