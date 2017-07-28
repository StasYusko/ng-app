import { AfterViewInit, Component, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

export class HeroesComponent implements OnInit, OnChanges {
  selectedHero: Hero;
  heroAdd: Hero;
  heroes: Hero[];
  private stream = new Subject<string>();
  @Input() textContainer: string;
  constructor(
    private heroService: HeroService,
    private router: Router,
    private chosenHeroStore: ChosenHeroStore,
    private actions: ActionsService,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.getHeroes();

    this.stream.asObservable()
        .debounceTime(300)
        .distinctUntilChanged()
        .subscribe(text => {
          //this.zone.run(() => this.textContainer = text);
          this.textContainer = text;
        });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("CHANGES");
  }

  keyupHandler(s: string): void {
    this.stream.next(s);

    setTimeout(()=>{console.log(this.textContainer)}, 1000);

    //Observable.of(this.stream.next(s)).subscribe(data => console.log(data));
    //this.stream.next(s as string);
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
    this.chosenHeroStore.push(this.actions.choose(this.selectedHero));
  }
}
