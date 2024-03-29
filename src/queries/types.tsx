export interface StoryPreview {
  id: number;
  date: string;
  title: string;
  excerpt: { html: string };
  featured_media: string;
  author_name: string;
  author_image: string;
  topic: string[];
  tone: string[];
  genre_medium: string[];
}

export interface Author {
  id: number;
  name: string;
  pronouns: string;
  bio: string;
  artist_statement: string;
  image: string;
}

export interface RecentSearch {
  value: string;
  numResults: number;
}

export interface Story {
  id: number;
  date: string;
  title: string;
  featured_media: string;
  author_id: number;
  author_name: string;
  author_image: string;
  topic: string[];
  tone: string[];
  genre_medium: string[];
  excerpt: { html: string };
  content: { html: string };
  process: { html: string };
  link: string;
}

export interface StoryCard {
  id: number;
  title: string;
  author_name: string;
  featured_media: string;
}

export interface Subgenre {
  id: number;
  name: string;
}

export interface Genre {
  parent_id: number;
  parent_name: string;
  subgenres: Subgenre[];
}

export interface GenreStories {
  parent_id: number;
  parent_name: string;
  subgenre_id: number;
  subgenre_name: string;
  genre_story_previews: string[];
}

export interface Reactions {
  profile_id: number;
  story_id: number;
  emoji_id: number;
  emoji: string;
}
