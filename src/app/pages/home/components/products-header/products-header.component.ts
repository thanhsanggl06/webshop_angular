import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "./products-header.component.html",
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  // @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  sort = "desc";
  itemsShowCount = 12;
  constructor() {}

  ngOnInit(): void {}

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort)
  }
  // onShowUpdated(newCount: number): void {
  //   this.itemsShowCount = newCount;
  //   this.itemsCountChange.emit(newCount);
  // }

  onColumnUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
