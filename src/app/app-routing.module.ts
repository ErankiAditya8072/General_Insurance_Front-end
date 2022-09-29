import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminClaimComponent } from './admin-claim/admin-claim.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin/admin.component';
import { BuyInsuranceComponent } from './buy-insurance/buy-insurance.component';
import { ClaimComponent } from './claim/claim.component';
import { ContactComponent } from './contact/contact.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { MyclaimComponent } from './myclaim/myclaim.component';
import { MypolicyComponent } from './mypolicy/mypolicy.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { PremiumComponent } from './premium/premium.component';

import { RenewComponent } from './renew/renew.component';

const routes: Routes = [
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'insurance', component: InsuranceComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'premium', component: PremiumComponent
  },
  {
    path: 'claim', component: ClaimComponent
  },
  {
    path:'', component: HomeComponent
  },
  {
    path:'buy', component: BuyInsuranceComponent
  },

  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'adminhome', component: AdminHomeComponent
  },
  {
    path: 'admindashboard', component: AdminDashboardComponent
  },{
    path: 'adminclaim',component:AdminClaimComponent
  },
  {
    path: 'mypolicy', component: MypolicyComponent
  },
  {
    path: 'renew', component: RenewComponent
  },
  {
    path:'myclaim',component: MyclaimComponent
  },
  {
    path:'forgotpassword',component:ForgotpasswordComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
