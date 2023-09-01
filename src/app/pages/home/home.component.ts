import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/service/cart.service";
const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  cols = 3;
  category: string | undefined;
  rowHeight = ROW_HEIGHT[this.cols];
  constructor(private cartService : CartService) {}

  ngOnInit(): void {}
  onColumnsCountChange(colsNumber: number): void {
    this.cols = colsNumber;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  onShowCategory(category: string): void {
    this.category = category;
  }

  onAddToCard(product : Product): void{
    this.cartService.addToCart({
      product: product.image,
      name : product.title,
      price : product.price,
      quantity : 1,
      id : product.id
    })
  }
}
