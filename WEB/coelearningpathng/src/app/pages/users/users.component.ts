import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

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
    listUsers: ['-1'] ,
    userName: ['', [Validators.required]]
  });

  ngOnInit() {
    //To trigger an event when the input username changes
    this.userForm.controls["userName"]
              .valueChanges.subscribe((value) => {
                    // called everytime when form control value is updated

                    this.nameEdited = (this.userName?.value) ? this.userName!.value : '';
                    this.onNameChange(this.nameEdited);
                 });
  }

  onSubmit() {
    console.log('name from submit ', this.nameEdited);
    this.editUserName.emit(this.nameEdited);
  }

  //Event from the select control
  userChanged(e: any){

    this.nameEdited = this.formatUserName(e.target?.value);
    console.log('name from select ', this.nameEdited);
    this.editUserName.emit(this.nameEdited);
  }

     // Access formcontrols getter
  get userName() {
     return this.userForm.get('userName');
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

  onNameChange(userName: string) {
    if (userName.length > 3) {
      this.editUserName.emit(userName);
    }
  }

};
