import { Component, OnInit, Inject, Input } from '@angular/core';
import { Product } from '../product'
import { TestAPIService } from '../test-api.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  constructor(private service: TestAPIService, private dialogRef: MatDialogRef<ProductDetailComponent>, @Inject(MAT_DIALOG_DATA) public product: Product) {
  }
  ngOnInit() { }

  onSubmit(product) {
    if (product.ID > 0) {
      this.service.UpdateProduct(product).subscribe(data => {
        if (data) {
          this.dialogRef.close(data);
        }
      });
    }
    else {
      this.service.SaveProduct(product).subscribe(data => {
        if (data) {
          this.dialogRef.close(data);
        }
      });
    }
  }

  handleFileSelect(event) {
    var file = event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.product.Image = btoa(binaryString);
  }

  onCancelClick() {
    this.dialogRef.close()
  }

}  
