import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../shared/product.model';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public popoverTitle: string = 'Delete';
  public popoverMessage: string = 'Do u want to delete ?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  product: Observable<Product>;
  products: Observable<Product[]>;

  constructor(private service: ProductService,
    private router: Router,private toastr: ToastrService,) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() 
  {
    this.service.getProductsList().subscribe(
      data=>{
        console.log(data)
        this.products=data

      },
      error=>{
        console.log(error);
      }
    );
    console.log(this.products);
  
  }
  deleteProduct(productid:number)
  {
  
    this.service.deleteProduct(productid).subscribe(data=>{
    console.log(data);
    this.toastr.error(' Oh No:(','Deleted successfully');
    })
  
  }

}
