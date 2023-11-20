import { Customer } from "./customer.model";
import { Product } from "./product.model";

export interface TrackingOrder {
  id: number;
  customer: Customer;
  amount: number;
  shippingAddress: string;
  orderDate: Array<number>;
  orderStatus: string;
  orderDetails: Array<TrackingOrderDetails>;
}

export interface TrackingOrderDetails {
  product: Product;
  quantity: number;
  price: number;
}
