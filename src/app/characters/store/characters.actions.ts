import { Character } from '@models/character';
import { ResponseInfo } from '@models/response-info';
import { createAction, props } from '@ngrx/store';

export const loadCharacterss = createAction(
  '[Characters] Load Characterss'
);

export const getCharactersData = createAction(
  '[Characters] Get Characters Data',
  props<{ filters: string, pageIndex?: number }>()
);
export const setCharactersData = createAction(
  '[Characters] Set Characters Data',
  props<{ responseInfo: ResponseInfo, characterList: Character[], pageIndex: number }>()
);


export const getSingleCharacter = createAction(
  '[Characters] Get Single Character Data',
  props<{ id: number }>()
);
export const setSingleCharacter = createAction(
  '[Characters] Set ingle Character Data',
  props<{ character: Character }>()
);





