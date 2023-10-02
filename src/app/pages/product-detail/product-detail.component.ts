import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl:'product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  id : string | any
  product : Product | undefined

  constructor(private route: ActivatedRoute,private storeService :StoreService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{ this.id =paramMap.get('id')}) 
    this.storeService.getSingeProduct(this.id).subscribe((product) => this.product = product)
  }

}
