import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ItemService } from '../item.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private itemService: ItemService) { }

  addForm: FormGroup;
  submitted = false;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      count: ['', Validators.required],
    });
  }

  checkUniqeId(itemsIds, id): boolean {
    if(itemsIds.includes(id)){
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

      if(this.checkUniqeId(itemsIds, this.addForm.value.id)    //uniqeId
        && this.addForm.valid) {                              //required
          this.itemService.addItem(this.addForm.value)
          .subscribe(() => {
            this.router.navigate(['']);
      });
    } 
  });
  }

  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }

}
