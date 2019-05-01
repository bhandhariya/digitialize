import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilydataComponent } from './familydata.component';

describe('FamilydataComponent', () => {
  let component: FamilydataComponent;
  let fixture: ComponentFixture<FamilydataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilydataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
