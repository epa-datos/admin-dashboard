import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from 'src/app/tools/validators/email.validator';
import { MultipleCheckboxValidator } from 'src/app/tools/validators/multiple-checkbox.validator';


@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.scss']
})
export class InviteUserComponent implements OnInit {

  form: FormGroup;
  email: AbstractControl;
  roles: any = ['Administrador', 'País', 'Retail', 'HP'];
  countries = ['Argentina', 'Chile', 'Colombia', 'México'];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.form = this.fb.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.validate])
      ],
      role: [
        '',
        [Validators.required]
      ],
      countries: this.fb.array(
        this.countries.map(() => this.fb.control('')),
        MultipleCheckboxValidator.validate
      ),
    });

    this.email = this.form.controls['email'];
  }

  convertToValue(key: string) {
    return this.form.value[key].map((x, i) => x && this[key][i]).filter(x => !!x);
  }

  onSubmit() {
    console.log('this.form.value', this.form.value)
    const valueToStore = Object.assign({}, this.form.value, {
      countries: this.convertToValue('countries')
    });
    console.log(valueToStore);
  }
}
