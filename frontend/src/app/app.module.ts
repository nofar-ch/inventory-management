import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms"; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ItemService} from './items/item.service';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { EditItemComponent } from './items/edit-item/edit-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    AddItemComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
