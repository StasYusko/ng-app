import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Hero } from '../models/hero';
import 'rxjs/add/operator/scan';
import { HeroAction } from '../actions/choose-hero.action';

@Injectable()
export class ChosenHeroService {

  private subjectHero = new Subject<Hero>();
  private id: number;

  chosenHero = this.subjectHero.asObservable();

  chooseHero(hero: Hero): void {
    this.subjectHero.next(hero);
  }

  updateHero(hero: Hero): void {
    if (this.id && this.id === hero.id) {
      this.chooseHero(hero);
    }
  }

  constructor() {
    this.chosenHero.subscribe(hero => hero ? this.id = hero.id : this.id = null);
  }
}
