import { BaseService } from './baseService';
import { Observable } from 'rxjs';

export class PassengerService extends BaseService {


  /**
   * Gets all passengers from database
   */
  getAll(): Observable<Passenger[]> {
    return this.serverGet(this.passengersEndpoint);
  }

  /**
   * Gets a passenger by its id
   * @param id the id of the passenger
   */
  get(id: string): Observable<Passenger> {
    return this.serverGet(this.passengersEndpoint + '/' + id);
  }

  /**
   * Creates a new passenger in database
   * @param passenger the new passenger
   */
  create(passenger: Passenger): Observable<Passenger> {
    return this.serverPost(this.passengersEndpoint, passenger);
  }

  /**
   * Boards a passenger into a spaceship
   * @param passengerId
   * @param spaceshipId
   */
  board(passengerId: Number, spaceshipId: string): Observable<Passenger> {
    let spaceship = {'spaceshipId' : spaceshipId};
    return this.serverPost(this.passengersEndpoint + '/' + passengerId + '/board', spaceship);
  }

  land(passengerId: Number, spaceshipId: string): Observable<Passenger> {
    let spaceship = {'spaceshipId' : spaceshipId};
    return this.serverPost(this.passengersEndpoint + '/' + passengerId + '/land', spaceship);
  }
}
