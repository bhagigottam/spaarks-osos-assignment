import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  constructor(private mainService:MainService) { }

  @Input("contacts") contacts:any = [];
  @Output() clearall = new EventEmitter();
  @Output() deleteone = new EventEmitter();

  ngOnInit(): void {
  }

  clearAll(){
    this.clearall.emit("clear");
  }

  deleteContact(ind:number){
this.deleteone.emit(String(ind));
  }


  editContact(ind:Number){
     this.mainService.updateSubject.next({index:ind});
  }

}
