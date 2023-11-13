import { RepoData } from "../interfaces/repo-data";

export const repositoryData = {
    name: 'Repository name',
    description: 'Repository description',
    stargazers_count: 123,
    open_issues_count: 456,
    owner: {
        login: 'User name',
        avatar_url: 'Avatar url',
    },
} as unknown as RepoData;
