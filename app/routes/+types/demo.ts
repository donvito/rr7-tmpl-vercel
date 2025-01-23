export namespace Route {
  export interface LoaderData {
    timestamp: string;
    randomNumber: number;
  }

  export interface LoaderArgs {}

  export interface MetaArgs {}

  export interface ComponentProps {
    loaderData: LoaderData;
  }
} 