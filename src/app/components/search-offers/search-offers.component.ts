import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobOfferService } from '../../services/job-offer.service';

@Component({
  selector: 'app-search-offers',
  templateUrl: './search-offers.component.html',
  styleUrls: ['./search-offers.component.css']
})
export class SearchOffersComponent {
  searchForm: FormGroup;
  jobOffers: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private jobOfferService: JobOfferService) {
    this.searchForm = this.fb.group({
      searchText: ['', Validators.required],
      maxResults: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get searchText() {
    return this.searchForm.get('searchText');
  }

  get maxResults() {
    return this.searchForm.get('maxResults');
  }

  onSubmit(): void {
    if (this.searchForm.valid) {
      this.jobOfferService.searchJobOffers(this.searchForm.value).subscribe(
        (response) => {
          if (response.status === 'OK') {
            this.jobOffers = response.data;
            this.successMessage = 'Offerte di lavoro trovate con successo!';
            this.errorMessage = '';
          } else {
            this.errorMessage = response.message;
            this.successMessage = '';
          }
        },
        (error) => {
          this.errorMessage = 'Errore durante la ricerca delle offerte di lavoro';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Per favore, compila tutti i campi correttamente.';
      this.successMessage = '';
    }
  }
}
