import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from 'src/app/tools/validators/email.validator';

@Component({
  selector: 'app-forgot-psw',
  templateUrl: './forgot-psw.component.html',
  styleUrls: ['./forgot-psw.component.scss']
})
export class ForgotPswComponent implements OnInit {
  usermail: string;
  email: AbstractControl;

  form: FormGroup;
  reqStatus: number = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.validate])
      ]
    });

    this.email = this.form.controls['email'];
  }

  sendPswResetEmail(email) {
  }
}
