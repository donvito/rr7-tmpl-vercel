import type { Character } from "./types";

export namespace Route {
  export interface Character {
    name: string;
    height: string;
    mass: string;
    birth_year: string;
  }

  export interface LoaderData {
    characters: Character[];
  }

  export interface LoaderArgs {}

  export interface MetaArgs {}

  export interface ComponentProps {
    loaderData: LoaderData;
  }
} 