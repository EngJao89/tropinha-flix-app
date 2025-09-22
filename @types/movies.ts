export interface Movie {
  id: string;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path?: string;
  genre_ids?: number[];
  original_language?: string;
  popularity?: number;
  adult?: boolean;
  video?: boolean;
}

export interface Genre {
  id: number;
  name: string;
}
