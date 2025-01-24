import type { LoaderFunctionArgs, MetaFunction } from "@react-router/types";

export namespace Route {
  export type LoaderData = {
    posts: {
      id: number;
      title: string;
      content: string;
      author: string;
      createdAt: string;
      updatedAt: string;
    }[];
  };

  export type LoaderArgs = LoaderFunctionArgs;
  export type MetaArgs = Parameters<MetaFunction>[0];
  export type ComponentProps = {
    loaderData: LoaderData;
  };
} 