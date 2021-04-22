import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title: string;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loadTitle(event.url);
      }
    })
  }

  ngOnInit(): void {
    this.loadTitle(this.router.url);
  }

  loadTitle(route: string) {
    if (route.includes('retailer')) {
      this.title = 'Retailer'
    } else if (route.includes('country')) {
      this.title = 'Visión general del país';
    } else {
      delete this.title;
    }
  }
}
