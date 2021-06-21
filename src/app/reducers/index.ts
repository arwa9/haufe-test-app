import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import { CharactersEffects } from '@characters/store/characters.effects'
import * as CharactersReducer from '@characters/store/characters.reducer'


export interface State {
  characters: CharactersReducer.State
}

export const reducers: ActionReducerMap<State> = {
  characters: CharactersReducer.reducer
};

export const effects: any[] = [
  CharactersEffects
];

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
