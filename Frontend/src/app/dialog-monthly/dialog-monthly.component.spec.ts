import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMonthlyComponent } from './dialog-monthly.component';

describe('DialogMonthlyComponent', () => {
  let component: DialogMonthlyComponent;
  let fixture: ComponentFixture<DialogMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMonthlyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
