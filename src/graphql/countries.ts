import { gql } from "@apollo/client";

export const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      code
      name
    }
  }
`;

export const GET_COUNTRIES_BY_CONTINENT = gql`
  query GetCountriesByContinent($code: ID!) {
    continent(code: $code) {
      code
      name
      countries {
        code
        name
        capital
        emoji
        currency
        languages {
          code
          name
        }
      }
    }
  }
`;

export interface Continent {
  code: string;
  name: string;
}

export interface Language {
  code: string;
  name: string | null;
}

export interface Country {
  code: string;
  name: string;
  capital?: string | null;
  emoji: string;
  currency?: string | null;
  languages: Language[];
}

export interface GetContinentsResponse {
  continents: Continent[];
}

export interface GetCountriesByContinentResponse {
  continent: {
    code: string;
    name: string;
    countries: Country[];
  } | null;
}
