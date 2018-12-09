import { BaseService } from './baseService';
import { Observable } from 'rxjs';

export class MothershipService extends BaseService {

  /**
   * Gets all motherships from database
   */
  getAll(): Observable<Mothership[]> {
    return this.serverGet(this.mothershipsEndpoint);
  }

  /**
   * Gets a mothership by its id
   * @param id the id of the mothership
   */
  get(id: string): Observable<Mothership> {
    return this.serverGet(this.mothershipsEndpoint + '/' + id);
  }

  /**
   * Creates a new mothership in database
   * @param mothership the new mothership
   */
  create(motheship: Mothership): Observable<Mothership> {
    return this.serverPost(this.mothershipsEndpoint, motheship);
  }

}
