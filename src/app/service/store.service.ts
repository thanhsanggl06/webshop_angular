import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category, Product } from "../models/product.model";
import { TrackingOrder } from "../models/tracking-order.model";

const STORE_BASE_URL = "http://localhost:8080";
// const STORE_BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  // fakestoreapi
  // getAllProducts(limit = '12', sort ='desc', category?: string): Observable<Array<Product>> {
  //   return this.httpClient.get<Array<Product>>(
  //     `${STORE_BASE_URL}/products${category ? '/category/' + category : ''}?sort=${sort}&limit=${limit}`
  //   )

  // }

  //api local host
  getAllProducts(page = "0", size = "12", sort = "desc", category?: string): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(`${STORE_BASE_URL}/products/paged${category ? "/category/" + category : ""}?page=${page}&size=${size}&sortOrder=${sort}`);
  }

  getPageProducts(page = "0", size = "12", sort = "desc", sortBy = "title", category?: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${STORE_BASE_URL}/products${category ? "/category/" + category : ""}?page=${page}&size=${size}&sortOrder=${sort}&sortBy=${sortBy}`);
  }

  getSingeProduct(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${STORE_BASE_URL}/products/${id}`);
  }

  getAllCategory(): Observable<Array<Category>> {
    return this.httpClient.get<Array<Category>>(`${STORE_BASE_URL}/category/all`);
  }

  trackingOrder(phoneNumber: string): Observable<Array<TrackingOrder>> {
    return this.httpClient.get<Array<TrackingOrder>>(`${STORE_BASE_URL}/order/tracking-order/${phoneNumber}`);
  }
}
