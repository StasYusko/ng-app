import { Component, OnInit } from '@angular/core';
import { Hero } from 'app/models/hero';
import { HeroService } from 'app/services/hero.service';
import { Router } from '@angular/router';
import { ChosenHeroService } from '../services/chosen-hero.service';

@Component({
  selector   : 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls  : ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroAdd: Hero;
  heroes: Hero[];
  text: string;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private chosenHeroservice: ChosenHeroService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .then(heroes =>
          this.heroes = heroes
        );
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
    this.chosenHeroservice.chooseHero(this.selectedHero);
  }

  keyupHandler(event: string): void {
    console.log(`WHAT? ${event.toString()}`);
    this.text = event.toString();
  }
}
