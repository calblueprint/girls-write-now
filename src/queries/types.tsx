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

export interface AuthorInfo {
  id: number;
  name: string;
  pronouns: string;
  bio: string;
  artist_statement: string;
  image: string;
}
