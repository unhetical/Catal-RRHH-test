import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, map } from 'rxjs/operators';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  dataLoading = false;
  user: User;
  formGroup: FormGroup;

  constructor(protected userService: UserService) {}

  ngOnInit(): void {
    this.createFormGroup();
    this.getUser();
  }

  // Register Form Controls
  createFormGroup(): void {
    this.formGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      // Address
      streetAddress: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      // Phone
      type: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Save User
   */
  saveUser(): void {
    this.user = {
      firstName: this.formGroup.controls.firstName.value,
      lastName: this.formGroup.controls.lastName.value,
      gender: this.formGroup.controls.gender.value,
      age: this.formGroup.controls.age.value,
      address: {
        city: this.formGroup.controls.city.value,
        state: this.formGroup.controls.state.value,
        postalCode: this.formGroup.controls.postalCode.value,
        streetAddress: this.formGroup.controls.streetAddress.value,
      },
      phoneNumbers: [
        {
          type: this.formGroup.controls.type.value,
          number: this.formGroup.controls.number.value,
        },
      ],
    };
  }

  /**
   * Update form
   */
  updateForm(): void {
    this.saveUser();
    this.userService.setUser(this.user);
  }

  /**
   * Get User
   */
  getUser(): void {
    this.userService
      .getUser()
      .pipe(
        map((user: User) => (this.user = user)),
        finalize(() => {
          this.setDefaultValue();
          this.setAddress();
          this.setPhone();
        })
      )
      .subscribe();
  }

  /**
   * Set initial values
   */
  setDefaultValue(): void {
    this.formGroup.controls.firstName.setValue(this.user.firstName);
    this.formGroup.controls.lastName.setValue(this.user.lastName);
    this.formGroup.controls.gender.setValue(this.user.gender);
    this.formGroup.controls.age.setValue(this.user.age);
  }

  /**
   * Set Adress values
   */
  setAddress(): void {
    this.formGroup.controls.city.setValue(this.user.address.city);
    this.formGroup.controls.state.setValue(this.user.address.state);
    this.formGroup.controls.postalCode.setValue(this.user.address.postalCode);
    this.formGroup.controls.streetAddress.setValue(
      this.user.address.streetAddress
    );
  }

  /**
   * Set phone values
   */
  setPhone(): void {
    this.formGroup.controls.type.setValue(this.user.phoneNumbers[0].type);
    this.formGroup.controls.number.setValue(this.user.phoneNumbers[0].number);
  }
}
