export class Hero {
  id: number;
  name: string;
  power: number;
  addresses: Address[];
}

export class Address {
  street = '';
  city   = '';
  zip    = '';
  state  = '';
}
