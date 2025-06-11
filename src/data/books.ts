
export interface Book {
  id: number;
  title: string;
  titleEn: string;
  year: number;
  publisher: string;
  publisherEn: string;
  genre: string;
  genreEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  isbn?: string;
  price?: number;
  stock_quantity?: number;
  featured?: boolean;
}

// This is now populated from the database
export const books: Book[] = [];
