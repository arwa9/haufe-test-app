import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators'

import * as CharactersActions from '@characters/store/characters.actions';
import { RestapiService } from 'src/app/shared/services/restapi.service';
import { of } from 'rxjs';
import { ResponseInfo } from '@models/response-info';

@Injectable()
export class CharactersEffects {

  loadCharacterData$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CharactersActions.getCharactersData),
        switchMap(({ filters, pageIndex }) => {
          const pagFilters: string = ((pageIndex || 0) > 1) ? (filters + `${filters ? '&' : '?'}page=${pageIndex}`) : filters;
          return this.rest.getCharacterList(pagFilters).pipe(
            map(responseData => CharactersActions.setCharactersData({
              responseInfo: responseData.info,
              characterList: responseData.results,
              pageIndex: pageIndex || 1
            })),
            catchError(err => {
              alert(err?.error?.error || 'There are no characters matching the selected criteria.');
              return of(CharactersActions.setCharactersData({responseInfo: {} as ResponseInfo, characterList: [], pageIndex: 1}))
            })
          )
        })
    )
  });

  loadSingleCharacter$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(CharactersActions.getSingleCharacter),
        switchMap(({ id }) => {
          return this.rest.getSingleCharacter(id).pipe(
            map(character => CharactersActions.setSingleCharacter({ character })),
            catchError(err => {
              alert(err?.error?.error || 'There are no characters matching the selected criteria.');
              return of(CharactersActions.setCharactersData({responseInfo: {} as ResponseInfo, characterList: [], pageIndex: 1}))
            })
          )
        })
    )
  });

  constructor(
    private actions$: Actions,
    private rest: RestapiService
    ) {}

}
