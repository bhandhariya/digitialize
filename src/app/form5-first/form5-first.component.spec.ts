import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form5FirstComponent } from './form5-first.component';

describe('Form5FirstComponent', () => {
  let component: Form5FirstComponent;
  let fixture: ComponentFixture<Form5FirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form5FirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form5FirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
