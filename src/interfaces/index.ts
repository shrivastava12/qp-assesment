import { UserRole } from 'src/models';

type role = UserRole;
export interface IAuthenticatedUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  role: role;
  active: true;
}

export interface IProduct {
  productId: number;
  price: number;
  quantity: number;
}

export interface IOrderRequest {
  totalPrice: number;
  items: IProduct[];
}

export interface IToken {
  token: string;
}
