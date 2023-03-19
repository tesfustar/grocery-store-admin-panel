import { Category } from "./Category";

export interface IProduct {
  category: Category;
  name: string;
  nameAm: string;
  description: string;
  descriptionAm: string;
  image:string[];
  wholeSalePrice:number;
  availableQuantity:number;
  hasSpecialOffer:boolean;
}
