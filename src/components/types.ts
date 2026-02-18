export interface Recipe {
  id: string;
  name: string;
  author: string;
  ingredients: string[];
  instructions: string;
  votes: number;
  image: string;
  category: string;
}
