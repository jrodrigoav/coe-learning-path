import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { adoworkitem } from 'src/app/model/adoworkitem.interface';

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

  editing: boolean = false;

  form = new FormGroup({
    listUsers: new FormControl(),
    userName: new FormControl()
  });

  onSubmit() {

  }

    userChanged(e: any){
      this.form.get('userName')?.setValue(e.target?.value, {
        onlySelf: true
      });

      this.updateGridResults(this.userName);
      console.log(this.userName);
    }

     // Access formcontrols getter
  get userName() {
    let user: string = '';
    user = this.form.get('userName')?.value;
     //To extract the name after the index number
    user = user.substring(user.indexOf(':') + 1)
    return user;
  }

    updateGridResults(userName: string) {

    }
    onNameChange(userName: string) {
      this.editUserName.emit(userName);
    }

};
