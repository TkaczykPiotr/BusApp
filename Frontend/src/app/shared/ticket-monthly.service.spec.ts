import { TestBed } from '@angular/core/testing';

import { TicketMonthlyService } from './ticket-monthly.service';

describe('TicketMonthlyService', () => {
  let service: TicketMonthlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketMonthlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
