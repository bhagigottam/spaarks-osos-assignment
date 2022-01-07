

import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showModal=false;
  myDate:any = new Date();

  constructor(private mainServ:MainService) {
 
    if(localStorage.getItem("contacts")){
      let data:any = localStorage.getItem("contacts");
      this.contacts = JSON.parse(data);
    }
    
    this.mainServ.updateSubject.subscribe((data:any)=>{
      console.log(data);
      this.editdetails = this.contacts[data.index];
      this.showModal=true;
    })
   }

   editdetails:any=null;

  ngOnInit(): void {
  }
contacts:any=[];
clearallContacts(){
  this.contacts=[];
}

deletecontact(eve:any){
  let ind = Number(eve);
  this.contacts.splice(ind,1);
}
addNewContact(eve:any){
  if(eve.mode=='edit'){
    let contact = {id:eve.id,name:eve.name,phone:eve.phone};
    this.contacts.forEach((val:any,ind:number)=>{
      if(val.id==eve.id){
        val.name=contact.name;
        val.phone = contact.phone;
      }
    })
    this.showModal=false;
  }else{

    let id = "1";
    if(this.contacts.length>0){
      id=String(Number(this.contacts[this.contacts.length-1].id)+1);
    }
    let contact = {id:id,name:eve.name,phone:eve.phone};
    this.contacts.push(contact);
  }

  localStorage.setItem("contacts",JSON.stringify(this.contacts));
}
}
