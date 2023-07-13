import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalesComponent } from './hospitales.component';

describe('HospitalesComponent', () => {
  let component: HospitalesComponent;
  let fixture: ComponentFixture<HospitalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HospitalesComponent]
    });
    fixture = TestBed.createComponent(HospitalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

