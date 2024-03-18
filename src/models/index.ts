export interface Repositories {
    total_count: number
    incomplete_results: boolean
    items: Repository[]
  }
  
  export interface Repository {
    id: number
    name: string
    description?: string
    html_url: string
    stargazers_count: number
    language?: string
    forks_count: number
    starred?: boolean // added by me
  }