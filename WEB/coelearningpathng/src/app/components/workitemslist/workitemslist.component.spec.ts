import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkitemslistComponent } from './workitemslist.component';

describe('WorkitemslistComponent', () => {
  let component: WorkitemslistComponent;
  let fixture: ComponentFixture<WorkitemslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkitemslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkitemslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
