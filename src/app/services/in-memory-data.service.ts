import { InMemoryDbService } from "angular-in-memory-web-api";
import { Hero } from "../models/hero";
import { HEROES } from "../mocks/mock-heroes";
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes: ReadonlyArray<Hero> = HEROES;
    return { heroes };
  }
}
