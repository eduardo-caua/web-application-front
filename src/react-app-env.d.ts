/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    REACT_APP_PAGE_SIZE: number;
    REACT_APP_SEARCH_PLACEHOLDER_BY_NAME: string;
    REACT_APP_EMPTY_LIST_MESSAGE: string;
    REACT_APP_URL_BASE: string;
  }
}
