import { Component, OnInit } from '@angular/core';
import { adoworkitem } from 'src/app/model/adoworkitem.interface';
import { AzuredevopsWorkitemsService } from 'src/app/services/azuredevops-workitems.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'coelearningpathng';
  workItems: adoworkitem[] = [];
  originalWorkItems: adoworkitem[] = [];
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
        this.originalWorkItems = data;
        this.workItems = this.originalWorkItems;

        this.generateStatus();
        //Value: value array from map
        //index, index iteration from array mapped
        //self, array mapped
        //index of: first index of the instance of a value
        this.filteredUsersList = this.workItems
        .map(function(wi) {return wi.assignedTo;})
        .filter((value, index, self) => self.indexOf(value) === index);

        this.filteredUsersList.push('Get all list');
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
    if(event === 'Get all list' || event === undefined){

      this.retrieveWorkItems();

    } else if(event !== '') {
      
      this.workItems = this.originalWorkItems;
      this.workItems = this.workItems
      .filter((value, index, self) => value.assignedTo.includes(event));

      if (this.workItems.length == 0){
        this.workItems = this.originalWorkItems;
      }
      console.log('Value emmited ', event.value)
    }
  }
}
