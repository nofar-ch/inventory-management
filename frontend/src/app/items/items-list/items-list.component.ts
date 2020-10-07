import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Item } from '../item';
import { ItemService } from '../item.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  items: Item[];
  isUpdating: boolean;
  private toggleText: string = "Edit";
  private show: boolean = false;
  private curItem: Item = null;

  constructor(private itemService: ItemService, private router: Router, private dataService: DataService) { 
  }

  ngOnInit() {
    setTimeout(() => {
      this.getAllItems();
    }
        ,200);
  }

  sortingById(a, b): number {
    return (a.id - b.id); 
  }

  getAllItems(): void {
    this.itemService.getAllItems().subscribe(data=>{
      data.sort((a, b) => this.sortingById(a,b));
      this.items = data;
    });
  };

  addItem(): void {
    this.router.navigate(['add-item']);
  }

  deleteItem(item: Item){
    this.itemService.deleteItem(item.id).subscribe(() => {
        setTimeout(() => 
            this.getAllItems()
            ,200);
    });
  }
  
  updateProduct(item: Item){
    this.dataService.itemUpdate = item;
    localStorage.removeItem("itemId");
    localStorage.setItem("itemId", item.id.toString());
    this.router.navigate(['edit-item']);
  }
  
  onToggle(item): void {
    this.curItem = item;
    this.show = !this.show;
    this.toggleText = this.show ? "Cancel" : "Edit";
  }

  deposit(item: Item): void {
    const count = (<HTMLInputElement>document.getElementById(item.id.toString())).value;
    if(count != '') {
        this.itemService.deposit(item.id, parseInt(count)).subscribe(()=>{
          setTimeout(() => 
                this.getAllItems()
                ,200); 
      });
    }
}
  withdraw(item: Item): void {
    const count = (<HTMLInputElement>document.getElementById(item.id.toString())).value;
    if(count != '') {
        this.itemService.withdraw(item.id, parseInt(count)).subscribe(()=>{
          setTimeout(() => 
                this.getAllItems()
                ,200); 
      });
    }
  }
}