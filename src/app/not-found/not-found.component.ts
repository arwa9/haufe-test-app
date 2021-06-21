import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit, OnDestroy {

  messages: string[] = [
    'Click me!',
    'Come on, do it.',
    'I don\'t have all day.',
    'You think you\'re so funny, right?',
    'Please, can we get done with this already?',
    '...',
    'You know what? Click me or I\'m outta here.',
    'Don\'t say I didn\'t warn you',
    '',
    '',
    'OK, I\'ll give you one more chance. Let\'s do this.'
  ];
  ind: number = 0;
  timer: any;

  constructor() { }

  ngOnInit(): void {
    this.timer = setInterval(() => {
      this.ind++;
      if(this.ind >= this.messages.length){
        this.ind = 0;
      }
    },3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer)
  }

}
