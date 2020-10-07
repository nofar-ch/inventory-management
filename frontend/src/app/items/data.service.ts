import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public itemUpdate: Item = new Item();

  constructor() { }
}