import { BaseService } from './baseService';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

export class SpaceshipService extends BaseService {

  /**
   * Gets all spaceships from database
   */
  getAll(): Observable<Spaceship[]> {
    return this.serverGet(this.spaceshipsEndpoint);
  }

  /**
   * Gets a spaceship by its id
   * @param id the id of the spaceship
   */
  get(id: string): Observable<Spaceship> {
    return this.serverGet(this.spaceshipsEndpoint + '/' + id);
  }

  /**
   * Creates a new spaceship in database
   * @param spaceship the new spaceship
   */
  create(spaceship: Spaceship): Observable<Spaceship> {
    return this.serverPost(this.spaceshipsEndpoint, spaceship);
  }

  getPassengers(id: string): Observable<Number[]> {
    return this.serverGet<Passenger[]>(this.spaceshipsEndpoint + '/' + id + '/getPassengers')
      .pipe(
        map(passenger => passenger.map(p => p.id))
      )
  }

}
