import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { skip, skipWhile, take } from 'rxjs/operators';

import * as CharactersActions from '@characters/store/characters.actions';
import * as CharactersSelect from '@characters/store/characters.selectors';
import { Observable, Subscription } from 'rxjs';
import { Character } from '@models/character';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.scss']
})
export class CharacterViewComponent implements OnInit, OnDestroy {

  id: number = 0;
  character: Observable<Character | undefined> = new Observable<Character | undefined>();

  sub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>
    ) { }

  ngOnInit(): void {
    this.sub = this.route.queryParams.pipe(
      skipWhile(params => !params['id']),
      take(1)
    ).subscribe(params => {
      this.id = params['id'];
      this.character = this.store.pipe(select(CharactersSelect.selectedCharacter({id: this.id})));
    });

    this.sub.add(
      this.character.subscribe(c => {
        if(!c) {
          this.store.dispatch(CharactersActions.getSingleCharacter({id: this.id}));
        }
      })
    );
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
