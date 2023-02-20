import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedpdfComponent } from './generatedpdf.component';

describe('GeneratedpdfComponent', () => {
  let component: GeneratedpdfComponent;
  let fixture: ComponentFixture<GeneratedpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratedpdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratedpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
