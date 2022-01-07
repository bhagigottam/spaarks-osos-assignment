import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit,OnChanges {

  myForm: FormGroup;
  @Output() addcontact = new EventEmitter();
  @Input() mode:String="normal";
  @Input() editdetailsinput = null;
  constructor() {
    this.myForm = new FormGroup({
      name: new FormControl('',{validators:[Validators.required]}),
      number: new FormControl('',{validators:[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(10)]})
    });
  }

  editId=-1;

  ngOnChanges(changes: SimpleChanges) {
      console.log(changes);
      if(changes['editdetailsinput']){
        if(changes['editdetailsinput'].currentValue){
          this.myForm.get('name')?.setValue(changes['editdetailsinput'].currentValue.name);
          this.myForm.get('number')?.setValue(changes['editdetailsinput'].currentValue.phone);
          this.editId = changes['editdetailsinput'].currentValue.id;
        }
      }
  }

  submitted=false;


  onSubmit(form:any){
    this.submitted=true;
    if(form.valid==false){
      alert("Inputs invalid, Please enter valid details");
      return;
    }
    if(this.mode!="edit"){

      this.addcontact.emit({name:form.value.name,phone:form.value.number,mode:"normal"});
    }else{
      this.addcontact.emit({name:form.value.name,phone:form.value.number,mode:"edit",id:this.editId});
    }
    console.log(form);
    this.myForm.reset();
    this.submitted=false;
    
  }
   

  ngOnInit(): void {}
   
}
