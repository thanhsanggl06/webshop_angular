import { Component, OnInit } from "@angular/core";
import { Cart } from "./models/cart.model";
import { CartService } from "./service/cart.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent implements OnInit{
  cart: Cart = { items:[]}
  title = "webshop";

  constructor(private cartService : CartService){}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart)=> {
      this.cart=_cart
    }
    )
  }
}
