import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { HeroService } from './services/hero.service';
import { AppComponent } from './app.component';
import { HeroesComponent } from './components/heroes.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard.component';
import { HeroDetailComponent } from './components/hero-detail.component';
import { HeroSearchComponent } from './components/hero-search.component';
import { TestDirective } from './directives/test.directive';
import { ChosenHeroComponent } from './components/chosen-hero.component';
import { ChosenHeroService } from './services/chosen-hero.service';
import { HeroFormComponent } from './components/hero-form.component';
import { ChosenHeroStore } from './services/chosen-hero-store.service';
import { ActionsService } from './services/actions.service';

@NgModule({
  imports     : [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    ChosenHeroComponent,
    DashboardComponent,
    HeroesComponent,
    HeroSearchComponent,
    TestDirective,
    HeroFormComponent
  ],
  providers   : [HeroService, ChosenHeroService, ChosenHeroStore, ActionsService],
  bootstrap   : [AppComponent]
})

export class AppModule {
}


