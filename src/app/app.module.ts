import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { ResidenceComponent } from './residence/residence.component';
import { ReactiveComponent } from './reactive/reactive.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { HttpClientModule} from '@angular/common/http';
import { UpdateProductComponent } from './update-product/update-product.component';
import { TvComponent } from './tv/tv.component';
import { MobileComponent } from './mobile/mobile.component';
import { CardComponent } from './card/card.component'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    ResidenceComponent,
    ReactiveComponent,
    NotFoundComponent,
    DetailProductComponent,
    AddProductComponent,
    UpdateProductComponent,
    TvComponent,
    MobileComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
