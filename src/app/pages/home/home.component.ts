import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Category, Product } from "src/app/models/product.model";
import { CartService } from "src/app/service/cart.service";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/service/store.service";
import { PageEvent } from "@angular/material/paginator";
import { MatPaginator } from "@angular/material/paginator";

const ROW_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  category: Category | undefined;
  rowHeight = ROW_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  sort = "desc";
  count = "12";
  totalItems = 100; // Tổng số mục dữ liệu
  pageSize = 10; // Kích thước trang mặc định
  currentPage = 0; // Trang hiện tại
  productsSubscription: Subscription | undefined;
  paginatedPages: number[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined; //Truy Cap vao matPaginator

  constructor(private cartService: CartService, private storeService: StoreService) {}
  ngOnDestroy(): void {
    this.productsSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscription = this.storeService.getPageProducts(this.currentPage.toString(), this.pageSize.toString(), this.sort, "title", this.category?.url.toString()).subscribe((_products) => {
      this.products = _products;
    });
  }
  onColumnsCountChange(colsNumber: number): void {
    this.cols = colsNumber;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: Category): void {
    this.category = newCategory;
    this.currentPage = 0;
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
    this.getProducts();
  }

  onAddToCard(product: Product): void {
    this.cartService.addToCart({
      product: product.imageUrl,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  // onItemsCountChange(newCount : number) : void{
  //   this.count = newCount.toString();
  //   this.getProducts()
  // }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }
  toProductDetail(product: Product) {
    console.log(product);
  }

  pageEvent(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getProducts();
    // this.loadPageData();
  }
}
