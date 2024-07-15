import { Component, OnInit } from '@angular/core';
import { JobOfferService } from '../../services/job-offer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jobOffers: any[] = [];
  maxResults: number = 10; // Numero massimo di offerte da visualizzare
  errorMessage: string = '';

  constructor(private jobOfferService: JobOfferService) {}

  ngOnInit(): void {
    this.loadJobOffers();
  }

  loadJobOffers(): void {
    this.jobOfferService.getJobOffers(this.maxResults).subscribe(
      (response) => {
        if (response.status === 'OK') {
          this.jobOffers = response.data;
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        this.errorMessage = 'Errore durante il caricamento delle offerte di lavoro';
      }
    );
  }

  onSubmit(): void {
    this.loadJobOffers();
  }
}
