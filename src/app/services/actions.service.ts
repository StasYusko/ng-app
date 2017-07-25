import { ChooseHeroAction, DeleteHeroAction, HeroAction, UpdateHeroAction } from '../actions/choose-hero.action';
import { Hero } from '../models/hero';
import { Injectable } from '@angular/core';

@Injectable()
export class ActionsService {
  choose(hero: Hero): HeroAction {
    return new ChooseHeroAction(hero);
  }

  update(hero: Hero): HeroAction {
    return new UpdateHeroAction(hero);
  }

  delete(hero: Hero): HeroAction {
    return new DeleteHeroAction(hero);
  }
}
