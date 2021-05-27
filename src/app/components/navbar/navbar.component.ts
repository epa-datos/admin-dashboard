import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { AppStateService } from 'src/app/services/app-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  focus;
  listTitles: any[] = [];
  location: Location;
  user: User;
  customTitle: string;
  customSubtitle: string;
  routes: any[] = [];
  currentRoute;

  sidebarSub: Subscription;
  countrySub: Subscription;
  retailerSub: Subscription;

  constructor(
    location: Location,
    private userService: UserService,
    private appStateService: AppStateService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.user = this.userService.user;

    if (this.appStateService.selectedCountry) {
      this.customTitle = this.appStateService.selectedCountry.name;
    }
    if (this.appStateService.selectedRetailer && this.user.role_name !== 'retailer') {
      this.customSubtitle = this.appStateService.selectedRetailer.name;
    } else if (this.appStateService.selectedRetailer) {
      this.customTitle = this.appStateService.selectedRetailer.name;
    }

    // sidebar titles
    this.sidebarSub = this.appStateService.sidebarData$.subscribe(resp => {
      this.routes = resp;
      this.listTitles = this.routes.filter(listTitle => listTitle);
    }, error => {
      console.error(`[navbar.component]: ${error}`);
    })

    // custom title
    this.countrySub = this.appStateService.selectedCountry$.subscribe(resp => {
      this.customTitle = resp?.name ? resp.name : undefined;
      // this.customizeTitle();
    }, error => {
      console.error(`[navbar.component]: ${error}`);
    });

    // custom subtitle
    this.retailerSub = this.appStateService.selectedRetailer$.subscribe(resp => {
      if (this.userService.user.role_name === 'retailer') {
        this.customTitle = resp?.name ? resp?.name : undefined;
      } else {
        this.customSubtitle = resp?.name ? resp.name : undefined;
      }
      // this.customizeTitle();
    }, error => {
      console.error(`[navbar.component]: ${error}`);
    });
  }

  getTitleByRoute() {
    let title = this.location.prepareExternalUrl(this.location.path());
    if (title.charAt(0) === '#') {
      title = title.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === title) {
        return this.listTitles[item].title;
      }

      if (title.includes(this.listTitles[item].path)) {
        return this.listTitles[item].title
      }
    }
    return 'dashboard';
  }

  customizeTitle() {
    // useful for retailer role
    if (!this.customTitle && this.customSubtitle) {
      this.customTitle = this.customSubtitle;
      delete this.customSubtitle;
    }
  }

  logout() {
    this.userService.logout();
  }

  ngOnDestroy() {
    this.sidebarSub?.unsubscribe();
    this.countrySub?.unsubscribe();
    this.retailerSub?.unsubscribe();
  }
}
