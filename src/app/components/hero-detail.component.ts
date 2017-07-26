import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { Location } from '@angular/common';
import { states } from '../utils/consts';
import 'rxjs/add/operator/switchMap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, Hero } from '../models/hero';

@Component({
  selector   : 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls  : ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnChanges {
  //hero: Hero;
  @Input() hero: Hero;

  heroForm: FormGroup;
  states = states;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.route.paramMap
        .switchMap((params: ParamMap) => {
          return this.heroService.getHero(+params.get('id'))
        })
        .subscribe(hero => {
          this.hero = hero;
          this.updateForm();
        });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateForm();
  }

  updateForm() {
    this.heroForm.reset({
      name : this.hero.name,
      power: this.hero.power
    });
    this.setAddresses(this.hero.addresses);
  }

  /*
   ----- ONCLICK BUTTON FUNCTIONS -----
   */
  save(): void {
    this.hero = this.prepareSaveHero();
    this.heroService.update(this.hero)
        .then(() => {
          this.goBack()
        });
  }

  prepareSaveHero(): Hero {
    const formModel = this.heroForm.value;

    const addressesDeepCopy: Address[] = formModel
      .addresses
      .map(ar => Object.assign({}, ar));

    const hero: Hero = {
      id       : this.hero.id,
      power    : formModel.power as number,
      name     : formModel.name as string,
      addresses: addressesDeepCopy
    };
    return hero;
  }

  goBack(): void {
    this.location.back();
  }

  private createForm() {
    this.heroForm = this.fb.group({
      name     : ['', Validators.required],
      addresses: this.fb.array([]),
      power    : ''
    });

    this.heroForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  setAddresses(addresses: Address[]) {
    const addressFGs       = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('addresses', addressFormArray);
  }

  get addresses(): FormArray {
    return this.heroForm.get('addresses') as FormArray;
  };

  addAddress() {
    this.addresses.push(this.fb.group(new Address()));
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }
}
