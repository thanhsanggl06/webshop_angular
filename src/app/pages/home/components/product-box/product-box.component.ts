import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/models/product.model";

@Component({
  selector: "app-product-box",
  templateUrl: "product-box.component.html",
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input()
  product : Product | undefined ;
  @Output() addToCart= new EventEmitter();
 

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onAddToCart() : void{
    this.addToCart.emit(this.product);
  }

  toProductDetail(id: number) : void{
      this.router.navigate(['/product', id]);
  }
}
