import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobOfferService } from '../../services/job-offer.service';

@Component({
  selector: 'app-delete-offer',
  templateUrl: './delete-offer.component.html',
  styleUrls: ['./delete-offer.component.css']
})
export class DeleteOfferComponent {
  deleteForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private jobOfferService: JobOfferService) {
    this.deleteForm = this.fb.group({
      id: ['', Validators.required]
    });
  }

  get id() {
    return this.deleteForm.get('id');
  }

  onSubmit(): void {
    if (this.deleteForm.valid) {
      this.jobOfferService.deleteJobOffer(this.id?.value).subscribe(
        (response) => {
          if (response.status === 'OK') {
            this.successMessage = 'Offerta di lavoro eliminata con successo!';
            this.deleteForm.reset();
          } else {
            this.errorMessage = response.message;
          }
        },
        (error) => {
          this.errorMessage = 'Errore durante l\'eliminazione dell\'offerta di lavoro';
        }
      );
    } else {
      this.errorMessage = 'Per favore, inserisci un ID valido.';
    }
  }
}
