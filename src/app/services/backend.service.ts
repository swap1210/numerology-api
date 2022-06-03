import { Injectable } from '@angular/core';
import { Util } from './Util';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  title = 'Numerology Calculator';
  constructor() {}

  calculateNums = (name: string) => {
    return {
      soul_number: Util.calculateSoulUrge(name),
      destiny_number: Util.calculateDestiny(name),
      personaly_number: Util.calculatePersonality(name),
    };
  };
}
