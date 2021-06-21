import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Character, StatusTypes } from '@models/character';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as CharactersActions from '@characters/store/characters.actions';
import * as CharactersSelect from '@characters/store/characters.selectors';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { concatMap, map, skip, tap } from 'rxjs/operators';
import { ResponseInfo } from '@models/response-info';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {

  characterList$: Observable<Character[]> = new Observable<Character[]>();
  responseInfo$: Observable<ResponseInfo> = new Observable<ResponseInfo>();
  currentPage: number = 4;
  // currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  pageArray: number[] = [];

  filtersForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    status: new FormControl(''),
    species: new FormControl('')
  });

  statusList: string [] = [
    '',
    'Alive',
    'Dead',
    'Unknown'
  ];

  showWarning: boolean = false;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.responseInfo$ = this.store.pipe(select(CharactersSelect.responseInfo));
    this.responseInfo$.subscribe(resp => {
      this.currentPage = resp.currentPage;
      const allPages: number[] = [...Array(resp.pages).keys()].map(x => ++x);
      const firstIndex =  allPages.indexOf(this.currentPage - 2);
      const lastIndex =  ((firstIndex >= 0) ? firstIndex : 0) + 5;
      const indexes: number[] = this.indexBetweenRange(firstIndex, lastIndex, allPages.length);
      this.pageArray = allPages.slice(indexes[0], indexes[1]);
    });

    this.characterList$ = this.store.pipe(
      select(CharactersSelect.characterList),
      concatMap((res, ind) => {
        return (ind > 0)
          ? of(res).pipe(
              // Only show "No values" warning after the first emitted value (to skip the default [] emmited by reducer's initial state)
              tap(val => {
                this.showWarning = (val || []).length < 1;
              })
            )
          : of(res)
      })
    );
  }

  loadData(pageIndex?: number){
    const filters: string = Object.keys(this.filtersForm.controls)
      .filter(c => this.filtersForm.get(c)?.value)
      .map((c, ind) => `${(ind > 0) ? '&' : '?'}${c}=${this.filtersForm.get(c)?.value}`)
      .join('');

    this.store.dispatch(CharactersActions.getCharactersData({filters, pageIndex}));
  }


  indexBetweenRange(_start: number, _end: number, length: number): number[] {
    let start: number = _start;
    let end: number = _end;

    if(end > length){
      end = length;
      start = end - 5;
    }

    if(start < 0){
      start = 0;
    }

    return [start, end];
  }

}
