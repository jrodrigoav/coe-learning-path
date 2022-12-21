import { Component, OnInit } from '@angular/core';
import { adoworkitem } from './model/adoworkitem.interface';
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

        this.generateStatus();
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

  generateStatus(){

    this.workItems.forEach(wi => {
      let milisec: number;
      let todayDate = new Date();
      let otherDate = new Date(wi.changedDate);
      milisec = todayDate.getTime() - otherDate.getTime();

      if (milisec < 64800000) //18 hrs
      {
        wi.statusClass = 'normal'
      } else if (milisec < 129600000) //36 hrs
      {
        wi.statusClass = 'warning'
      }

    });
  }

  handleEdit(event: any) {

    if(event !== '') {
      this.workItems = this.workItems
      .filter((value, index, self) => value.assignedTo.includes(event));

    } else {
      this.retrieveWorkItems();
    }
  }

}
