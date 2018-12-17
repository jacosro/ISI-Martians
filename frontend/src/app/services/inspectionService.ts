import { BaseService } from './baseService';
import { Observable } from 'rxjs';

export class InspectionService extends BaseService {

  /**
   * Gets all inspections from database
   */
  getAll(): Observable<Inspection[]> {
    return this.serverGet(this.inspectionsEndpoint);
  }

  /**
   * Gets a inspection by its id
   * @param id the id of the inspection
   */
  get(id: string): Observable<Inspection> {
    return this.serverGet(this.inspectionsEndpoint + '/' + id);
  }

  /**
   * Creates a new inspection in database
   * @param inspection the new inspection
   */
  create(inspection: Inspection): Observable<Inspection> {
    return this.serverPost(this.inspectionsEndpoint, inspection);
  }
}
