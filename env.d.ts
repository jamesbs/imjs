declare namespace NodeJS {
  export interface ProcessEnv {
    ENVIRONMENT: 'development' | 'production'
    PORT: `${number}`
    BASE_URL: string
    GITHUB_CLIENT_ID: string
    GITHUB_CLIENT_SECRET: string
    SESSION_SECRET: string
  }
}
