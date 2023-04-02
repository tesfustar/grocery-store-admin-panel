export interface IBranchAdmin {
  phone: number | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address:string;
  branch:string
  // location
}


export interface IBranch{
  name:string;
  location:number[];
  lat:number | undefined;
  lng:number | undefined
}