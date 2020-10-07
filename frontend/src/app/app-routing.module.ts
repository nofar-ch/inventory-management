import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsListComponent } from './items/items-list/items-list.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { EditItemComponent } from './items/edit-item/edit-item.component';

const routes: Routes = [
  { path: '', component: ItemsListComponent, pathMatch: 'full' },
  { path: 'add-item', component: AddItemComponent },
  { path: 'edit-item', component: EditItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
