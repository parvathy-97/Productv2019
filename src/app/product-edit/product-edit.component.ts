import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/product.model';
import { ToastrService } from 'ngx-toastr';
import { error } from 'util';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
product:Product=new Product();
formProduct:FormGroup;
  constructor(private service:ProductService,private formBuilder:FormBuilder,private route:ActivatedRoute,private toastr: ToastrService) { }
  productid:number;


  ngOnInit() {
    this.productid=this.route.snapshot.params["id"];

    this.formProduct = this.formBuilder.group({
      productid: [null],
      productname: ['', [Validators.required]],
      productdescription: ['',[Validators.required]],
      promfgdate: ['', [Validators.required]],
      productprice: ['', [Validators.required]]
    });
    
    console.log("ProductID: "+this.productid);
    this.service.getProduct(this.productid)
      .subscribe(data=>{
      this.product=data;
      console.log(data)
      console.log(data.productDateStr);
      this.product.promfgdate=data.productDateStr;
    },error=>console.log(error));

  }
  updateProduct() {
    this.product.productname = this.formProduct.controls.productname.value;
    this.product.productdescription = this.formProduct.controls.productdescription.value;
    this.product.promfgdate = this.formProduct.controls.promfgdate.value;
    this.product.productprice = this.formProduct.controls.productprice.value;
    this.service.updateProduct(this.productid,this.product).subscribe();
    
    this.toastr.warning('WooHoo :)', 'Updated Successfully');
  }

}
