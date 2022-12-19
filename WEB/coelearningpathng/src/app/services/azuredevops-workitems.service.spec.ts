import { TestBed } from '@angular/core/testing';

import { AzuredevopsWorkitemsService } from './azuredevops-workitems.service';

describe('AzuredevopsWorkitemsService', () => {
  let service: AzuredevopsWorkitemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzuredevopsWorkitemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
