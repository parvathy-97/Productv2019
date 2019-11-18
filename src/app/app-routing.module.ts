import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
 {path:'login',component:LoginComponent },
 {path:'products',component:ProductListComponent},
 {path:'add',component:ProductAddComponent},
 {path:'update/:id',component:ProductEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      onSameUrlNavigation :'reload'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
