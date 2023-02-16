import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of NY City',
      'https://blog-www.pods.com/wp-content/uploads/2019/11/MG_NY_6_1_Manhattan.jpg',
      149.99
    ),
    new Place(
      'p2',
      'Miraflores - Lima',
      'A city in the beach',
      'https://www.peruforless.com/blog/wp-content/uploads/2022/10/top-picture-2.jpg',
      140.0
    ),
    new Place(
      'p3',
      'Los Angeles',
      'Cool City',
      'https://media.timeout.com/images/105904304/750/422/image.jpg',
      200.0
    ),
  ];

  constructor() {}

  get places() {
    return [...this._places];
  }
}
