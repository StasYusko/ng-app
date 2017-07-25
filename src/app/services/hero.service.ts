import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';

import 'rxjs/add/operator/toPromise';

import { Headers, Http } from '@angular/http';
import { ChosenHeroStore } from './chosen-hero-store.service';
import { ActionsService } from './actions.service';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';
  private headers   = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http,
    private chosenHeroStore: ChosenHeroStore,
    private actions: ActionsService
  ) {}

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
               .toPromise()
               .then(response => response.json().data as Hero)
               .catch(this.handleError);
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }

  create(hero: Hero): Promise<Hero> {
    return this.http
               .post(this.heroesUrl, JSON.stringify(hero), { headers: this.headers })
               .toPromise()
               .then(res => res.json().data as Hero)
               .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
               .put(url, JSON.stringify(hero), { headers: this.headers })
               .toPromise()
               .then(() => {
                 this.chosenHeroStore.push(this.actions.update(hero));
                 return hero
               })
               .catch(this.handleError);
  }

  delete(hero: Hero): Promise<void> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.delete(url, { headers: this.headers })
               .toPromise()
               .then(() => {
                 this.chosenHeroStore.push(this.actions.delete(hero));
                 return null;
               })
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
