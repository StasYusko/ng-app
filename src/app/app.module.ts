import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HeroDetailComponent } from "./components/hero-detail.component";
import { HeroesComponent } from "./components/heroes.component";
import { HeroService } from "./services/hero.service";
import { DashboardComponent } from "./components/dashboard.component";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    DashboardComponent,
    HeroesComponent
  ],
  providers: [ HeroService ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
}


