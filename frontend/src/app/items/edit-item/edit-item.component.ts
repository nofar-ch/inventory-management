import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ItemService } from '../item.service';
import { Router } from "@angular/router";
import { Item } from '../item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  itemUpdate: Item;
  editForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private itemService: ItemService,private dataService: DataService) { }

  ngOnInit() {
    let itemId = localStorage.getItem("itemId");
    if(!itemId){
      alert("Something wrong!");
        this.router.navigate(['']);
    }
    else
        this.itemUpdate = this.dataService.itemUpdate;  

    this.editForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      count: ['', Validators.required],
    });
  }

  checkUniqeId(itemsIds, id): boolean {
    if(itemsIds.includes(id) && this.itemUpdate.id != id){
      alert("This id is already exist")
      return false;
    }
    else return true;
  }

  onSubmit(){
    this.submitted = true;

    this.itemService.getAllItems().subscribe(
      data => {
      const items = data
      const itemsIds = items.map((item) => item.id)

      if(this.checkUniqeId(itemsIds, this.editForm.value.id)    //uniqeId
        && this.editForm.valid) {
      this.itemService.updateItem(localStorage.getItem("itemId"), this.editForm.value)
      .subscribe( () => {
        this.router.navigate(['']);
      });
      }
    });
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }
}


