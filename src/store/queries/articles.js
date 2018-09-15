import gql from 'graphql-tag';

const standardArticleResult = gql`
    fragment standardArticleResult on Article {
        id
        author {
            id
            email
            firstName
            lastName
            avatarPath
            position
        }
        isPost
        postAs
        postingCompany {
            id
            name
            logoPath
        }
        postingTeam {
            id
            name
            coverPath
        }
        images {
            id
            path
            isFeatured
        }
        videos {
            id
            path
            isFeatured
        }
        title
        description
        tags {
            id
            title
            votes
            canVote
        }
        createdAt
        updatedAt
    }
`;

export const getArticles = gql`
    query articles($language: LanguageCodeType!) {
        articles(language: $language) {
            ...standardArticleResult
        }
    }
    ${standardArticleResult}
`;

export const getArticle = gql`
    query article($id: String!, $language: LanguageCodeType!) {
        article(id: $id, language: $language) {
            ...standardArticleResult
        }
    }
    ${standardArticleResult}
`;

export const getNewsFeedArticles = gql`
    query newsFeedArticles(
        $language: LanguageCodeType!, 
        $peopleOrCompany: String
        $tags: [String]
    ) {
        newsFeedArticles(language: $language, peopleOrCompany: $peopleOrCompany, tags: $tags) {
            ...standardArticleResult
        }
    }
    ${standardArticleResult}
`;

export const getFeedArticles = gql`
    query feedArticles($language: LanguageCodeType!, $userId: String, $companyId: String, $teamId: String) {
        feedArticles(language: $language, userId: $userId, companyId: $companyId, teamId: $teamId) {
            ...standardArticleResult
        }
    }
    ${standardArticleResult}
`;

export const handleArticle = gql`
    mutation handleArticle($language: LanguageCodeType!, $article: ArticleInput, $options: ArticleOptions) {
        handleArticle(language: $language, article: $article, options: $options) {
            status
            error
        }
    }
`;

export const removeArticle = gql`
    mutation removeArticle($id: String!) {
        removeArticle(id: $id) {
            status
            error
        }
    }
`;

export const handleArticleTags = gql`
    mutation handleArticleTags($language: LanguageCodeType!, $details: ArticleTagsInput!) {
        handleArticleTags(language: $language, details: $details) {
            status
            error
        }
    }
`;

export const appreciateMutation = gql`
    mutation appreciate($tagId: Int!, $articleId: String!) {
        appreciate(tagId: $tagId, articleId: $articleId) {
            status
        }
    }
`;