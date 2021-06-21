import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'characters',
    loadChildren: () => import('@characters/characters.module').then(m => m.CharactersModule),
    data: { preload: true }
  },

  // Redirections
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
