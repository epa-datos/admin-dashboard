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
  roles: any = [
    {
      id: 1,
      name: 'admin'
    },
    {
      id: 2,
      name: 'country'
    },
    {
      id: 3,
      name: 'retailer'
    },
    {
      id: 4,
      name: 'hp'
    }
  ];
  countries = [
    {
      id: 1,
      name: 'México'
    },
    {
      id: 2,
      name: 'Argentina'
    },
    {
      id: 3,
      name: 'Chile'
    },
    {
      id: 4,
      name: 'Colombia'
    }
  ];
  retailers = [
    {
      id: 1,
      name: 'Liverpool'
    },
    {
      id: 2,
      name: 'Carrefourl'
    },
    {
      id: 3,
      name: 'Frávega'
    },
    {
      id: 4,
      name: 'Garbarino'
    },
    {
      id: 5,
      name: 'Office Depot'
    },
    {
      id: 6,
      name: 'Office Max'
    },
  ];
  sectors = [
    {
      id: 1,
      name: 'Marketing'
    },
    {
      id: 2,
      name: 'Retail'
    },
    {
      id: 3,
      name: 'WWS PS'
    },
    {
      id: 4,
      name: 'WWS Print'
    }
  ];

  categories = [
    {
      id: 1,
      name: 'Cómputo'
    },
    {
      id: 2,
      name: 'Impresoras'
    },
    {
      id: 3,
      name: 'Suministros'
    }
  ]
  selectedRole: any;

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
      retailers: this.fb.array(
        this.retailers.map(() => this.fb.control('')),
        MultipleCheckboxValidator.validate
      ),
      sectors: this.fb.array(
        this.sectors.map(() => this.fb.control('')),
        MultipleCheckboxValidator.validate
      ),
      categories: this.fb.array(
        this.categories.map(() => this.fb.control('')),
        MultipleCheckboxValidator.validate
      ),
    });

    this.email = this.form.controls['email'];
  }

  roleChange() {
    if (this.selectedRole) {
      console.log('exists selectedRole', this.selectedRole)
      this.resetCheckboxes();
    }
  }

  resetCheckboxes() {
    this.form.reset({
      'countries': '',
      'retailers': '',
      'sectors': '',
      'categories': ''
    });
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
