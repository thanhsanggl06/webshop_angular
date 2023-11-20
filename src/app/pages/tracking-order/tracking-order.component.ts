import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Cart, CartItem } from "src/app/models/cart.model";
import { TrackingOrder, TrackingOrderDetails } from "src/app/models/tracking-order.model";
import { CartService } from "src/app/service/cart.service";
import { StoreService } from "src/app/service/store.service";

@Component({
  selector: "app-tracking-order",
  templateUrl: "./tracking-order.component.html",
})
export class TrackingOrderComponent implements OnInit {
  orderid: string = "1";
  listTrackingOrder: Array<TrackingOrder> = [];
  phoneNumber: string = "";
  trackingOrderSubscription: Subscription | undefined;

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = ["product", "name", "price", "quantity", "total", "action"];
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}

  getTotal(items: Array<TrackingOrderDetails>): number {
    let total: number = 0;
    items.forEach((d) => {
      total += d.price * d.quantity;
    });
    return total;
  }

  onTrackingOrder(): void {
    this.trackingOrderSubscription = this.storeService.trackingOrder(this.phoneNumber).subscribe({
      next: (response) => {
        this.listTrackingOrder = response;
        console.log(this.listTrackingOrder);
      },
      error(err) {
        if (err.error.errorCode === "CUSTOMER_NOT_FOUND") {
          alert("Khách hàng không tồn tại trong hệ thống");
        }
        // alert("Lỗi");
      },
    });
  }
}
