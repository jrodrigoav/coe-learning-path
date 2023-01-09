import { Component, Input } from '@angular/core';
import { adoworkitem } from 'src/app/model/adoworkitem.interface';

@Component({
  selector: 'app-workitemslist',
  templateUrl: './workitemslist.component.html',
  styleUrls: ['./workitemslist.component.css']
})
export class WorkitemslistComponent {

  @Input()
  workItemsList: adoworkitem[] = [];


}
