import { Component, OnInit } from '@angular/core';
import { Hero } from 'app/models/hero';
import { HeroService } from 'app/services/hero.service';
import { Router } from '@angular/router';
import { ChosenHeroStore } from '../services/chosen-hero-store.service';
import { ActionsService } from '../services/actions.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector   : 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls  : ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroAdd: Hero;
  heroes: Hero[];

  textContainer: string;

  private stream = new Subject<string>();

  constructor(
    private heroService: HeroService,
    private router: Router,
    private chosenHeroStore: ChosenHeroStore,
    private actions: ActionsService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .then(heroes =>
          this.heroes = heroes
        );
    this.stream.asObservable().debounceTime(100).distinctUntilChanged()
      .subscribe(o => {
        this.textContainer = o;
        console.log(`In Observable ${o}`);
      });
    this.stream.subscribe(()=> console.log(`log text: ${this.textContainer}`));
  }

  newHero() {
    this.heroAdd = new Hero();
  }

  add(hero: Hero): void {
    if (!hero.name.trim()) { return; }
    this.heroService.create(hero)
        .then(hero => {
          this.heroes.push(hero);
          this.heroAdd = null;
        });
  }

  delete(hero: Hero): void {
    this.heroService
        .delete(hero)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        });

  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);

  }

  chooseHero(): void {
    this.chosenHeroStore.push(this.actions.choose(this.selectedHero));
  }

  keyupHandler(s: string): void {
    console.log(`WHAT? ${s}`);
    //this.textContainer = s;
    this.stream.next(s)
  }
}
