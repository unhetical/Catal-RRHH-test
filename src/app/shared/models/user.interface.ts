export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  gender: string;
  age: number;
  address: Address;
  phoneNumbers: Phone[];

}

export interface Address {
  streetAddress: string;
  city: string;
  state: string;
  postalCode: number;
}

export interface Phone {
type: string;
number: string;
}
