import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-other-tools',
  templateUrl: './other-tools.component.html',
  styleUrls: ['./other-tools.component.scss']
})
export class OtherToolsComponent implements OnInit {

  activeTabView = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
