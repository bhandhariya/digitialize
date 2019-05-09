import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordian-demo',
  templateUrl: './accordian-demo.component.html',
  styleUrls: ['./accordian-demo.component.css']
})
export class AccordianDemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  panelOpenState = false;
}
