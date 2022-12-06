import { NewEntryComponent } from './new-entry/new-entry.component';
import { LandPageComponent } from './land-page/land-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path: '', component: LandPageComponent},
{path: 'new', component: NewEntryComponent},
{path: 'new/:param', component: NewEntryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
