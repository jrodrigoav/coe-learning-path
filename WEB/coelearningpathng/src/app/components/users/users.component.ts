import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  @Input()
  usersList: string[] = [];
  nameEdited: string = '';

  @Output()
  editUserName: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Injecting the reactive forms module instead of using "new"
   */
  constructor(private fb: FormBuilder) {

  }

  userForm = this.fb.group({
    listUsers: ['-1'],
  });

  //Event from the select control
  userChanged(e: any){

    this.nameEdited = this.formatUserName(e.target?.value);
    console.log('name from select ', this.nameEdited);
    this.editUserName.emit(this.nameEdited);
  }

  formatUserName(rawName: string) {
    let user: string;

     //To extract the name after the index number
    user = rawName.substring(rawName.indexOf(':') + 1)
    return user.trim();
  }

  get listUsers(){
    return this.userForm.get("listUsers");
  }

};
