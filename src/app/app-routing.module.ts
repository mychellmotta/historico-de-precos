import { NewEntryComponent } from './new-entry/new-entry.component';
import { LandPageComponent } from './land-page/land-page.component';
import { ProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path: '', component: LandPageComponent},
{path: 'new', component: NewEntryComponent},
{path: 'new/:param', component: NewEntryComponent},
{path: 'stores', component: StoreComponent},
{path: 'products', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
