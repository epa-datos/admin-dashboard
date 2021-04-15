import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audiences-wrapper',
  templateUrl: './audiences-wrapper.component.html',
  styleUrls: ['./audiences-wrapper.component.scss']
})
export class AudiencesWrapperComponent implements OnInit {

  trafficByMonths = []

  constructor() { }

  ngOnInit(): void {
    this.getTrafficByMonths();
  }

  getTrafficByMonths() {
    let firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 90);
    let visits = 1200;
    for (var i = 0; i < 90; i++) {
      let newDate = new Date(firstDate);
      newDate.setDate(newDate.getDate() + i);

      visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

      this.trafficByMonths.push({
        date: newDate,
        visits: visits
      });
    }
  }

}
