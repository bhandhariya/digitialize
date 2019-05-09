import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordianDemoComponent } from './accordian-demo.component';

describe('AccordianDemoComponent', () => {
  let component: AccordianDemoComponent;
  let fixture: ComponentFixture<AccordianDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordianDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordianDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
