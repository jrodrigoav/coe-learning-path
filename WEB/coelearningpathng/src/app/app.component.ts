import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { of  } from 'rxjs';
import { distinct } from 'rxjs/operators';
import { adoworkitem } from './model/adoworkitem.interface';
import { WorkitemslistComponent } from './pages/workitemslist/workitemslist.component';
import { AzuredevopsWorkitemsService } from './services/azuredevops-workitems.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'coelearningpathng';
  workItems: adoworkitem[] = [];
  filteredUsersList: string[] = [];

  constructor(private workItemService: AzuredevopsWorkitemsService  ) {}
  ngOnInit() {

    this.retrieveWorkItems();
  }

  retrieveWorkItems(): void {
    this.workItemService
    .getAll()
    .subscribe({
      next: (data) => {
        this.workItems = data;

        //Value: value array from map
        //index, index iteration from array mapped
        //self, array mapped
        //index of: first index of the instance of a value
        this.filteredUsersList = this.workItems
        .map(function(wi) {return wi.assignedTo;})
        .filter((value, index, self) => self.indexOf(value) === index);
      },
      error: (e) => console.error(e)
    });



  }


}
