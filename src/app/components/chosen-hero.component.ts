import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Hero } from 'app/models/hero';
import 'rxjs/add/observable/fromPromise';
import { ChosenHeroStore } from '../services/chosen-hero-store.service';

@Component({
  selector   : 'chosen-hero',
  templateUrl: 'chosen-hero.component.html'
})
export class ChosenHeroComponent implements OnInit, OnDestroy {
  hero: Hero;

  subscription: Subscription;
  constructor(
    private chosenHeroStore: ChosenHeroStore
  ) {}

  ngOnInit(): void {
    this.subscription = this.chosenHeroStore.chosenHero
                                       .subscribe(hero => this.hero = hero);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
