import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobOfferService } from '../../services/job-offer.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css']
})
export class NewOfferComponent {
  jobOfferForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private jobOfferService: JobOfferService) {
    this.jobOfferForm = this.fb.group({
      title: ['', Validators.required],
      shortDescription: ['', Validators.required],
      datePosted: ['', Validators.required],
      grossSalary: ['', [Validators.required, Validators.min(0)]]
    });
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

  onSubmit(): void {
    if (this.jobOfferForm.valid) {
      this.jobOfferService.createJobOffer(this.jobOfferForm.value).subscribe(
        (response) => {
          if (response.status === 'OK') {
            this.successMessage = 'Offerta di lavoro aggiunta con successo!';
            this.jobOfferForm.reset();
          } else {
            this.errorMessage = response.message;
          }
        },
        (error) => {
          this.errorMessage = 'Errore durante l\'aggiunta dell\'offerta di lavoro';
        }
      );
    } else {
      this.errorMessage = 'Per favore, compila tutti i campi correttamente.';
    }
  }
}