import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../items/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { 
  }

  baseurl: string = "http://localhost:3000/";
  headers: any = {responseType: 'text'}
 

  getAllItems(){
    return this.http.get<Item[]>(this.baseurl + 'items');
  }

  getItemById(id: Number){
    return this.http.get<Item>(this.baseurl + 'items/' + id);
  }

  addItem(item: Item){
    return this.http.post(this.baseurl + 'items/add', item, this.headers);
  }

  deleteItem(id: Number){
    return this.http.delete(this.baseurl + 'items/' + id, this.headers);
  }

  updateItem(id, item: Item){
    return this.http.put(this.baseurl + 'items/' + id, item, this.headers);
  }

  deposit(id, count: Number){
    return this.http.put(this.baseurl + 'items/deposit/' + id, {deposit: count}, this.headers);
  }

  withdraw(id, count: Number){
    return this.http.put(this.baseurl + 'items/withdraw/' + id, {withdraw: count}, this.headers);
  }
}