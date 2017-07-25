import { AfterViewChecked, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Hero } from '../models/hero';
import { NgForm } from '@angular/forms';

@Component({
  selector   : 'hero-form',
  templateUrl: 'hero-form.component.html',
  styleUrls  : [ 'hero-form.component.css' ]
})
export class HeroFormComponent implements AfterViewChecked {
  @Output() submitHero = new EventEmitter<Hero>();

  heroForm: NgForm;
  @ViewChild('heroForm') currentForm: NgForm;

  hero: Hero;
  submitted = true;

  formErrors = {
    'name': '',
    'power': ''
  };

  validationMessages = {
    'name': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 20 characters long.',
      'forbiddenName': 'Someone named "XXX" cannot be a hero.'
    },
    'power': {
      'required': 'Power is required.'
    }
  };

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    if (this.currentForm === this.heroForm) { return; }
    this.heroForm = this.currentForm;
    if (this.heroForm) {
      this.heroForm.valueChanges
          .subscribe(data => this.onValueChanged(data));
    }
  }

  onValueChanged(data?: any) {
    if (!this.heroForm) { return; }
    const form = this.heroForm.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  addHero(): void {
    this.hero      = new Hero();
    this.submitted = false;
  }

  onSubmit(): void {
    this.submitted = true;
    this.submitHero.emit(this.hero);
  }

  cancel(): void {
    this.submitted = true;
  }
}
