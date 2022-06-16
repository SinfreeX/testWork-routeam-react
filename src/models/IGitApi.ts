export interface IProject {
    id: number
    name: string
    stargazers_count: number
    watchers: number
    html_url: string
    owner: {
        login: string
        avatar_url: string
    }
}