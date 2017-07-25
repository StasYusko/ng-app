import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../models/hero';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HeroService } from '../services/hero.service';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { ChosenHeroService } from '../services/chosen-hero.service';

@Component({
  selector   : 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls  : [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
    private chosenHeroService: ChosenHeroService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
        .switchMap((params: ParamMap) => {
          return this.heroService.getHero(+params.get('id'))
        })
        .subscribe(hero => this.hero = hero);
  }

  /*
   ----- ONCLICK BUTTON FUNCTIONS -----
   */
  save(): void {
    this.heroService.update(this.hero)
        .then((hero) => {
          //this.chosenHeroService.updateHero(hero);
          this.goBack()
        });
  }

  goBack(): void {
    this.location.back();
  }
}
