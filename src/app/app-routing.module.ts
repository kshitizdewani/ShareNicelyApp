import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuardGuard} from "./guards/auth-guard.guard";

const routes: Routes = [

  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full'
  },
  {
    path: 'feed',
    loadChildren: () => import('./pages/feed/feed.module').then( m => m.FeedPageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule),
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule),
    canActivate: [AuthGuardGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
