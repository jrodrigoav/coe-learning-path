import { Component, Input } from '@angular/core';
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

  form = new FormGroup({
    listUsers: new FormControl(),
    userName: new FormControl()
  });

  onSubmit() {

  }
}
