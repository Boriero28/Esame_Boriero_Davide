import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NewOfferComponent } from './components/new-offer/new-offer.component';
import { EditOfferComponent } from './components/edit-offer/edit-offer.component';
import { DeleteOfferComponent } from './components/delete-offer/delete-offer.component';
import { SearchOffersComponent } from './components/search-offers/search-offers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-offer', component: NewOfferComponent },
  { path: 'edit-offer', component: EditOfferComponent },
  { path: 'delete-offer', component: DeleteOfferComponent },
  { path: 'search-offers', component: SearchOffersComponent },
  {path:"**",component:NotFoundComponent}  //se metto un /namepage che non esiste, vengo indirizzato in una pagina di errore];
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
