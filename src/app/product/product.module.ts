import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material'
@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    MatDialogModule
  ],
  declarations: [ProductListComponent,ProductDetailComponent],
  entryComponents:[ProductDetailComponent]  
})
export class ProductModule { }
