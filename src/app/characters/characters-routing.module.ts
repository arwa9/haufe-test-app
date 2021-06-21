import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterViewComponent } from './character-view/character-view.component';

const routes: Routes = [
  {
    path: 'list',
    component: CharacterListComponent
  },
  {
    path: 'view',
    component: CharacterViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterRoutingModule { }
