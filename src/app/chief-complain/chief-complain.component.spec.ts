import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiefComplainComponent } from './chief-complain.component';

describe('ChiefComplainComponent', () => {
  let component: ChiefComplainComponent;
  let fixture: ComponentFixture<ChiefComplainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiefComplainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiefComplainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
