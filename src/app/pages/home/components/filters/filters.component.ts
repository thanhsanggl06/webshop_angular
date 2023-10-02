import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { Category } from "src/app/models/product.model";
import { StoreService } from "src/app/service/store.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent implements OnInit , OnDestroy{
  @Output() showCategory = new EventEmitter<Category>();
  categoriesSubsciption : Subscription | undefined;
  categories : Array<Category> | undefined;
  constructor(private storeService: StoreService) {}

  ngOnDestroy(): void {
    this.categoriesSubsciption?.unsubscribe();
  }

  ngOnInit(): void {
   this.categoriesSubsciption = this.storeService.getAllCategory().subscribe((response) => this.categories = response)
  }

  onShowCategory(category: Category): void {
    this.showCategory.emit(category);
  }
}
