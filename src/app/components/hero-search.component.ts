import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
//
// Observable class extensions
import 'rxjs/add/observable/of';
//
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from '../services/hero-search.service';
import { Hero } from '../models/hero';
import 'rxjs/add/operator/filter';
//
// Constants
import { KEYS_TO_START_SEARCH } from '../utils/consts';
import { Observable } from 'rxjs/Observable';

@Component({
  selector   : 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls  : [ './hero-search.component.css' ],
  providers  : [ HeroSearchService ]
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  //heroes: Hero[];
  private searchTerms = new Subject<string>();

  readonly keysToStartSearch = KEYS_TO_START_SEARCH;

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ) {}

  // Push a search term into the observable stream.
  search(term: any): void {
    this.searchTerms.next(term.target.value);
  }

  ngOnInit(): void {
    this.heroes =
    this.searchTerms
        .debounceTime(300)
        .distinctUntilChanged()
        //.filter(term => term.length >= this.keysToStartSearch)
        .map(term => term.length >= this.keysToStartSearch ? term : null)
        .switchMap(term => term
          //term.length >= this.keysToStartSearch
            ? this.heroSearchService.search(term)
            : Observable.of<Hero[]>([])
        )
        .catch(error => {
          console.log(error);
          return Observable.of<Hero[]>([]);
        })
        //.subscribe(list => this.heroes = list);
  }

  gotoDetail(hero: Hero): void {
    let link = [ '/detail', hero.id ];
    this.router.navigate(link);
  }
}
