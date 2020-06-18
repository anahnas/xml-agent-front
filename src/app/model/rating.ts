import { User } from './user';
import {Car} from "./car";

export class Rating {
    id: String;
    comment: String;
    userDTO: User = new User();
    carDTO: Car = new Car();
    rating: number;
  }
