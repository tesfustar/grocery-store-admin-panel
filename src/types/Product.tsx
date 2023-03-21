import { ICategory } from "./Category";

export interface IProduct {
  category: ICategory;
  name: string;
  nameAm: string;
  description: string;
  descriptionAm: string;
  image:string[];
  wholeSalePrice:number;
  availableQuantity:number;
  hasSpecialOffer:boolean;
}
