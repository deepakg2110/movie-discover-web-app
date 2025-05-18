export interface Movie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  overview: string
  genre_ids: number[]
}

export interface Person {
  id: number
  name: string
  profile_path: string | null
  known_for_department: string
  known_for: {
    id: number
    title?: string
    name?: string
    media_type: string
  }[]
}

export interface MovieDetails extends Movie {
  genres: {
    id: number
    name: string
  }[]
  runtime: number
  tagline: string
  videos?: {
    results: {
      id: string
      key: string
      name: string
      site: string
      type: string
    }[]
  }
  credits?: {
    cast: {
      id: number
      name: string
      character: string
      profile_path: string | null
    }[]
    crew: {
      id: number
      name: string
      job: string
      department: string
    }[]
  }
  similar?: {
    results: Movie[]
  }
}
