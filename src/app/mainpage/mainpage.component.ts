import { Component, OnInit } from '@angular/core';
import { TestAPIService } from '../test-api.service'
import { Product } from '../product'
import { Router } from '@angular/router'
import { ProductDetailComponent } from '../product-detail/product-detail.component'
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  showImage: boolean = true;
  products: Product[]
  filteredProducts: Product[]
  _listFilter: string;
  get listFilter(): string {
    return this._listFilter
  }
  set listFilter(value: string) {

    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.filterProducts(this.listFilter) : this.products
  }
  constructor(private service: TestAPIService, private router: Router, private dialog: MatDialog) {
    this.listFilter = "";
  }
  ngOnInit() {
    this.GetProducts();
  }
  GetProducts() {
    this.service.GetProducts().subscribe(data => { this.products = data; this.filteredProducts = data;})
  }

  onShowHidebuttonClick() {
    this.showImage = !this.showImage;
  }

  onDeleteClick(product: Product) {
    if (confirm("Are you sure want to delete?") == true) {
      this.service.DeleteProduct(product.ID).subscribe(response => {
        if (response) {
          let itemIndex = this.filteredProducts.indexOf(product);
          if (itemIndex > 0) {
            this.filteredProducts.splice(itemIndex, 1)
          }
        }
      })
    }
  }
  filterProducts(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter(product => product.Name.toLocaleLowerCase().indexOf(filterBy) != -1)
  }

  onLogoutClick() {
    sessionStorage.removeItem('userToken');
    this.router.navigate(['']);
  }

  onAddClick() {
    this.openModelPopUP(new Product());
  }
  onEditClick(product) {
    var _obJProduct = Object.assign({}, product);
    this.openModelPopUP(_obJProduct);
  }

  openModelPopUP(product: Product) {
    let dialogRef = this.dialog.open(ProductDetailComponent, { data: product });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (product.ID == 0) {
          this.filteredProducts.push(result);
        }
        else {
          let item = this.filteredProducts.filter(x => x.ID == product.ID)[0];
          let itemIndex = this.filteredProducts.indexOf(item);
          this.filteredProducts[itemIndex] = result;
        }
      }
    });
  }
}

