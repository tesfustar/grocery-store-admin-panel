export interface IBranchAdmin {
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?:string;
  branch:string
  // location
}


export interface IBranch{
  name:string;
  address:string;
  lat:number | undefined;
  lng:number | undefined
}