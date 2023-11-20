import { Cart, CartItem } from "./cart.model";

export interface Customer {
  phoneNumber: string;
  name: string;
}

export interface OrderRequest {
  customerRequest: Customer;
  shippingAddress: string;
  items: Array<CartItem>;
}
