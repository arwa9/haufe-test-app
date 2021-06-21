import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCharactersReducer from '@characters/store/characters.reducer';

export const selectCharacterState = createFeatureSelector<fromCharactersReducer.State>(
  fromCharactersReducer.charactersFeatureKey,
);

export const responseInfo = createSelector(
  selectCharacterState,
  (state) => state.responseInfo
);

export const characterList = createSelector(
  selectCharacterState,
  (state) => state.characterList
);

export const selectedCharacter = (props: {id: number}) => createSelector(
  selectCharacterState,
  (state) => state.characterList.find(char => char.id == props.id as number)
);
