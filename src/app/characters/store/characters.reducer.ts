import { Character } from '@models/character';
import { Action, createReducer, on } from '@ngrx/store';

import * as CharactersActions from '@characters/store/characters.actions';
import { ResponseInfo } from '@models/response-info';

export const charactersFeatureKey = 'characters';

export interface State {
  responseInfo: ResponseInfo,
  characterList: Character[]
}

export const initialState: State = {
  responseInfo: {} as ResponseInfo,
  characterList: []
};


export const reducer = createReducer(
  initialState,

  on(CharactersActions.setCharactersData, (state, action) => {
    return {
      ...state,
      // currentPage: action.pageIndex,
      responseInfo: {
        ...action.responseInfo,
        currentPage: action.pageIndex
      },
      characterList: action.characterList
    }
  }),

  on(CharactersActions.setSingleCharacter, (state, action) => {
    return {
      ...state,
      characterList: [action.character]
    }
  }),

);

