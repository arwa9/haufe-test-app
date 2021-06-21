import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterListComponent } from '@characters/character-list/character-list.component';
import { CharacterCardComponent } from '@characters/character-list/character-card/character-card.component';
import { CharacterRoutingModule } from '@characters/characters-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../reducers';
import { EffectsModule } from '@ngrx/effects';
import { CharactersEffects } from './store/characters.effects';
import * as fromCharacters from './store/characters.reducer';
import { CharacterViewComponent } from './character-view/character-view.component';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    CharacterListComponent,
    CharacterCardComponent,
    CharacterViewComponent
  ],
  imports: [
    CommonModule,
    CharacterRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([CharactersEffects]),
    StoreModule.forFeature(fromCharacters.charactersFeatureKey, fromCharacters.reducer)
    // !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
})
export class CharactersModule { }
