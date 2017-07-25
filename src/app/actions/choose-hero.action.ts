import { Hero } from '../models/hero';
import * as consts from '../utils/consts';

export class HeroAction {
  action: string;
  hero: Hero;

  constructor(hero: Hero) {
    this.hero = hero;
  }
}

export class DeleteHeroAction extends HeroAction {
  constructor(hero: Hero) {
    super(hero);
    this.action = consts.DELETE_HERO_ACTION;
  }
}

export class UpdateHeroAction extends HeroAction {
  constructor(hero: Hero) {
    super(hero);
    this.action = consts.UPDATE_HERO_ACTION;
  }
}

export class ChooseHeroAction extends HeroAction {
  constructor(hero: Hero) {
    super(hero);
    this.action = consts.CHOOSE_HERO_ACTION;
  }
}

