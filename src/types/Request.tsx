import { IProduct } from "./Product";

export enum ProductRequestStatus {
  PENDING = "PENDING",
  DELIVERED = "DELIVERED",
  ONGOING = "ONGOING",
}
export interface RequestedProduct {
  product: IProduct;
  quantity: number;
}
export interface IProductRequest  {
  product: RequestedProduct[];
  branch: string;
  status:ProductRequestStatus;
  isDelivered:boolean;
  deliveredDate:Date;
}
