export class Character {

  constructor(){ }

  id: number = 0;
  name: string = '';
  gender: string = '';
  status: StatusTypes = StatusTypes.Unknown;
  species: string = '';
  location: Location = {} as Location;
  origin: Location = {} as Location;
  image: string = '';
}

export enum StatusTypes {
  'Dead',
  'Alive',
  'Unknown'
}

interface Location {
  name: string;
  url: string;
}
