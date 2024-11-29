import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PaginationModel} from "../model/Pagination/pagination.model";
import {LeadFilterModel} from "../model/Lead/lead-filter.model";
import {Observable} from "rxjs";
import {LeadModel, PaginatedLeads} from "../interface/lead.model";

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  readonly ROUTE = 'https://localhost:7171/api/Lead';
  constructor(private http: HttpClient) { }


  getLeads(leadFilter?: LeadFilterModel, pagination?: PaginationModel): Observable<PaginatedLeads> {
    const params = this.serializeParams({ ...leadFilter, ...pagination });

    return this.http.get<PaginatedLeads>(`${this.ROUTE}/get-leads`, { params });
  }

  private serializeParams(params: any): { [param: string]: string } {
    return Object.fromEntries(
      Object.entries(params || {}).map(([key, value]) => [
        key,
        value instanceof Date ? value.toISOString() : value?.toString() ?? '',
      ])
    );
  }

}
