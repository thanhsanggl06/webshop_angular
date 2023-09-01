import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  sort = "giảm dần";
  itemsShowCount = 12;
  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
  }
  onShowUpdated(newCount: number): void {
    this.itemsShowCount = newCount;
  }

  onColumnUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
