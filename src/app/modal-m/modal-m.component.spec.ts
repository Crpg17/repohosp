import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMComponent } from './modal-m.component';

describe('ModalMComponent', () => {
  let component: ModalMComponent;
  let fixture: ComponentFixture<ModalMComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMComponent]
    });
    fixture = TestBed.createComponent(ModalMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
