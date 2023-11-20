import { Injectable } from "@angular/core";
import { Cart, CartItem } from "../models/cart.model";
import { BehaviorSubject, Observable } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { OrderRequest } from "../models/customer.model";
import { HttpClient } from "@angular/common/http";

const STORE_BASE_URL = "http://localhost:8080";

@Injectable({
  providedIn: "root",
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar, private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCard = items.find((_item) => _item.id === item.id);

    if (itemInCard) {
      itemInCard.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this.savetoLocalStorage();
    this._snackBar.open("1 sản phẩm đã được thêm vào giỏ hàng.", "Ok", { duration: 3000 }); // show snackBar trong 3s
    console.log(this.cart.value);
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }
    this.cart.next({ items: filteredItems });
    this.savetoLocalStorage();
    this._snackBar.open("1 Sản phẩm đã được xóa khỏi giỏ hàng", "Ok", { duration: 3000 });
  }

  getTotal(items: Array<CartItem>): number {
    return items.map((item) => item.price * item.quantity).reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this.savetoLocalStorage();
    this._snackBar.open("Làm mới giỏ hàng thành công", "Ok", { duration: 3000 });
  }

  orderDone(): void {
    this.cart.next({ items: [] });
    this.savetoLocalStorage();
    this._snackBar.open("Đặt hàng thành công", "Ok", { duration: 3000 });
  }

  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItem = this.cart.value.items.filter((_item) => _item.id !== item.id);
    if (update) {
      this.cart.next({ items: filteredItem });
      this._snackBar.open("1 sản phẩm đã được xóa khỏi giỏ hàng", "Ok", { duration: 3000 });
    }
    this.savetoLocalStorage();
    return filteredItem;
  }

  placeOrder(data: OrderRequest): Observable<String> {
    return this.http.post<String>(`${STORE_BASE_URL}/order/create`, data);
  }

  savetoLocalStorage(): void {
    localStorage.removeItem("cart");
    localStorage.setItem("cart", JSON.stringify(this.cart.value));
  }

  loadFromLocalStorage(): void {
    const storagedCart = localStorage.getItem("cart");
    if (storagedCart) {
      const parsedCart: Cart = JSON.parse(storagedCart);
      this.cart.next(parsedCart);
    }
  }
}
