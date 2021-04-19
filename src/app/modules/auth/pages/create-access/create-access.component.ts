import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-access',
  templateUrl: './create-access.component.html',
  styleUrls: ['./create-access.component.scss']
})
export class CreateAccessComponent implements OnInit {
  code: string;
  reqStatus: number = 0;
  errorMsg: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.code = this.route.snapshot.queryParamMap.get('code') &&
      this.route.snapshot.queryParamMap.get('code')
  }

  singup(newPassword) {
    this.reqStatus = 1;
    this.userService.singup(this.code, newPassword)
      .subscribe(() => {
        this.reqStatus = 2;
        delete this.errorMsg;
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
        error => {
          this.reqStatus = 3;
          this.errorMsg = error?.error?.message ? error.error.message : error?.message;
        }
      )
  }
}
