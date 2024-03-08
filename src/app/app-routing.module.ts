import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ResidenceComponent } from './residence/residence.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { TvComponent } from './tv/tv.component';
import { MobileComponent } from './mobile/mobile.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'product',component:ProductComponent},
  {path:'residence',component:ResidenceComponent},
  {path:'form', component:ReactiveComponent},
  {path:'tv', component:TvComponent},
  {path:'mobile', component:MobileComponent},
  {path:'addProduct', component:AddProductComponent},
  {path:'detail/:id', component:DetailProductComponent},
  {path:'updateP/:id', component:UpdateProductComponent},
  //route par defaut
  {path:'',redirectTo:'/home',pathMatch:'full'},
  //route NotFound
  {path:'**',component:NotFoundComponent},
  //route parametrée

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
