import { FormArray } from '@angular/forms';

// Multiple checkbox required one validator
export class MultipleCheckboxValidator {
    public static validate(fa: FormArray) {
        let valid = false;

        for (let x = 0; x < fa.length; ++x) {
            if (fa.at(x).value) {
                valid = true;
                break;
            }
        }
        return valid ? null : {
            validate: true
        };
    }
}
