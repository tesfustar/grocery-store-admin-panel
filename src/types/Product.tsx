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

export interface IProductFormProps {
  category: string;
  name: string;
  nameAm: string;
  description: string;
  descriptionAm: string;
  image: Array<any>;
  price: string;
  priceType:string;
}

export interface IBranchProduct {
  product:{
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
}

export interface IBranchAddProductForm {
  quantity:number | undefined;
  product:string;
}

export interface IBranchProduct{
  product:{
    category: ICategory;
  name: string;
  nameAm: string;
  description: string;
  descriptionAm: string;
  image:string[];
  wholeSalePrice:number;
  availableQuantity:number;
  hasSpecialOffer:boolean;
  },
  availableQuantity:number
}