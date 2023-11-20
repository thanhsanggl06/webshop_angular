import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CartComponent } from "./pages/cart/cart.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { PlaceOrderComponent } from "./place-order/place-order.component";
import { TrackingOrderComponent } from "./pages/tracking-order/tracking-order.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "cart", component: CartComponent },
  { path: "product", component: ProductDetailComponent },
  { path: "product/:id", component: ProductDetailComponent },
  { path: "place-order", component: PlaceOrderComponent },
  { path: "tracking-order", component: TrackingOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
