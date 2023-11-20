import { Component, OnInit } from "@angular/core";
import { Cart, CartItem } from "../models/cart.model";
import { CartService } from "../service/cart.service";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { OrderRequest } from "../models/customer.model";

interface ProvinceData {
  // Định nghĩa cấu trúc của đối tượng dữ liệu từ API
  districts: any[]; // Hoặc định nghĩa kiểu cụ thể cho districts
  // Các thuộc tính khác
}

@Component({
  selector: "app-place-order",
  templateUrl: "./place-order.component.html",
})
export class PlaceOrderComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: "https://via.placeholder.com/150",
        name: "Đồng hồ",
        price: 150,
        quantity: 1,
        id: 1,
      },
    ],
  };

  orderRequest: OrderRequest = {
    customerRequest: { name: "", phoneNumber: "" },
    shippingAddress: "",
    items: [],
  };

  noNumber: string = "";
  streetName: string = "";
  selectedProvince: string = "";
  selectedDistrict: string = "";
  selectedWard: string = "";
  province?: any[];
  districts?: any[];
  wards?: any[];
  wardCode: any = 0;
  districtCode: any = 0;
  code: any = 0;
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = ["product", "name", "price", "quantity", "total", "action"];
  constructor(private cartService: CartService, private route: Router, private http: HttpClient) {}
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });

    this.http.get<any[]>("https://provinces.open-api.vn/api/").subscribe((ls) => (this.province = ls));
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.orderDone();
  }

  onProvinceChange(): void {
    this.http.get<ProvinceData>("https://provinces.open-api.vn/api/p/" + this.code + "?depth=2").subscribe((ls) => (this.districts = ls.districts));

    const selected = this.province?.find((p) => p.code === Number(this.code));

    if (selected) {
      this.selectedProvince = selected.name;
      console.log(this.selectedProvince);
    }
  }

  onDistrictChange(): void {
    this.http.get<any>("https://provinces.open-api.vn/api/d/" + this.districtCode + "?depth=2").subscribe((ls) => (this.wards = ls.wards));

    const selected = this.districts?.find((d) => d.code === Number(this.districtCode));

    if (selected) {
      this.selectedDistrict = selected.name;
      console.log(this.selectedDistrict);
    }
  }

  onWardChange(): void {
    const selected = this.wards?.find((w) => w.code === Number(this.wardCode));

    if (selected) {
      this.selectedWard = selected.name;
      console.log(this.selectedWard);
    }
  }

  onPlaceOrder(): void {
    this.orderRequest.shippingAddress = this.noNumber + " " + this.streetName + ", " + this.selectedWard + ", " + this.selectedDistrict + ", " + this.selectedProvince;
    this.orderRequest.items = this.cart.items;
    this.cartService.placeOrder(this.orderRequest).subscribe({
      next: (response) => {
        this.route.navigateByUrl("/home");
        this.onClearCart();
      },
      error: (err) => {
        console.log(err);
        alert("lỗi");
      },
    });
  }
}
