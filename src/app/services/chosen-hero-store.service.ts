import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HeroAction } from '../actions/choose-hero.action';
import { Subject } from 'rxjs/Subject';
import * as consts from '../utils/consts';
import { Hero } from '../models/hero';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ChosenHeroStore implements OnInit, OnDestroy {
  private id: number;
  private subjectAction = new Subject<HeroAction>();
  private output        = new Subject<Hero>();
  private subscriptions = new Array<Subscription>();
          heroAction    = this.subjectAction.asObservable();
          chosenHero    = this.output.asObservable();

  push(heroAction: HeroAction): void {
    this.subjectAction.next(heroAction);
  }

  private next(hero: Hero): void {
    this.output.next(hero);
  }

  ngOnInit(): void {
  }
  constructor() {
    this.subscriptions.push(
      this.chosenHero.subscribe(hero => hero ? this.id = hero.id : this.id = null),

      this.heroAction
          .subscribe(h => {
            switch (h.action) {

              case consts.CHOOSE_HERO_ACTION:
                this.next(h.hero);
                break;

              case consts.UPDATE_HERO_ACTION:
                this.id === h.hero.id ? this.next(h.hero) : '';
                break;

              case consts.DELETE_HERO_ACTION:
                this.id === h.hero.id ? this.next(null) : '';
                break;
            }
          })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(o => o.unsubscribe());
  }

}
