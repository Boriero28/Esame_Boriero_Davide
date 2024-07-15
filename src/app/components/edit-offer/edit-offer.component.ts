import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobOfferService } from '../../services/job-offer.service';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css']
})
export class EditOfferComponent {
  jobOfferForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private jobOfferService: JobOfferService) {
    this.jobOfferForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      datePosted: ['', Validators.required],
      grossSalary: ['', [Validators.required, Validators.min(0)]]
    });
  }

  get id() {
    return this.jobOfferForm.get('id');
  }

  get title() {
    return this.jobOfferForm.get('title');
  }

  get shortDescription() {
    return this.jobOfferForm.get('shortDescription');
  }

  get datePosted() {
    return this.jobOfferForm.get('datePosted');
  }

  get grossSalary() {
    return this.jobOfferForm.get('grossSalary');
  }

  onLoadOffer(): void {
    if (this.id?.valid) {
      this.jobOfferService.getJobOfferById(this.id?.value).subscribe(
        (response) => {
          if (response.status === 'OK') {
            const jobOffer = response.data;
            // Formatta la data in un formato compatibile con l'input di tipo date
            jobOffer.datePosted = new Date(jobOffer.datePosted).toISOString().split('T')[0];
            this.jobOfferForm.patchValue(jobOffer);
            this.errorMessage = '';
          } else {
            this.errorMessage = response.message;
          }
        },
        (error) => {
          this.errorMessage = 'Errore durante il caricamento dei dettagli dell\'offerta di lavoro';
        }
      );
    } else {
      this.errorMessage = 'Per favore, inserisci un ID valido.';
    }
  }

  onSubmit(): void {
    if (this.jobOfferForm.valid) {
      this.jobOfferService.updateJobOffer(this.jobOfferForm.value).subscribe(
        (response) => {
          if (response.status === 'OK') {
            this.successMessage = 'Offerta di lavoro aggiornata con successo!';
          } else {
            this.errorMessage = response.message;
          }
        },
        (error) => {
          this.errorMessage = 'Errore durante l\'aggiornamento dell\'offerta di lavoro';
        }
      );
    } else {
      this.errorMessage = 'Per favore, compila tutti i campi correttamente.';
    }
  }
}