import { Hero } from '../models/hero';

export const HEROES: Hero[] = [
/*  { id: 10, power: 12, name: 'He-Man' },
  { id: 11, power: 23, name: 'Mr. Nice' },
  { id: 12, power: 11, name: 'Mr. Narco' },
  { id: 13, power: 20, name: 'Mr. Bombasto' },
  { id: 14, power: 37, name: 'Celeritas' },
  { id: 15, power: 56, name: 'Magneta' },
  { id: 16, power: 34, name: 'RubberMan' },
  { id: 17, power: 39, name: 'Dynama' },
  { id: 18, power: 70, name: 'Dr IQ' },
  { id: 19, power: 13, name: 'Magma' },
  { id: 20, power: 45, name: 'Tornado' }*/
  {
    id: 1,
    name: 'Whirlwind',
    power: 10,
    addresses: [
      {street: '123 Main',  city: 'Anywhere', state: 'CA',  zip: '94801'},
      {street: '456 Maple', city: 'Somewhere', state: 'VA', zip: '23226'},
    ]
  },
  {
    id: 2,
    name: 'Bombastic',
    power: 10,
    addresses: [
      {street: '789 Elm',  city: 'Smallville', state: 'OH',  zip: '04501'},
    ]
  },
  {
    id: 3,
    name: 'Magneta',
    power: 10,
    addresses: [ ]
  },
];
