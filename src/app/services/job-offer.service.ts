import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {
  private apiUrl = 'https://vdpb-ackend.vercel.app/api/job-offers'; // Assicurati che l'URL sia corretto

  constructor(private http: HttpClient) {}

  getJobOffers(maxResults: number): Observable<any> {
    let params = new HttpParams().set('maxResults', maxResults.toString());
    return this.http.get(this.apiUrl, { params });
  }

  createJobOffer(jobOffer: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, jobOffer);
  }

  getJobOfferById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateJobOffer(jobOffer: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/update`, jobOffer);
  }

  deleteJobOffer(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/delete/${id}`);
  }

  searchJobOffers(searchCriteria: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, searchCriteria);
  }
}