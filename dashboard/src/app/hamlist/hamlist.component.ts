import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-hamlist',
  templateUrl: './hamlist.component.html',
  styleUrls: ['./hamlist.component.css'],
  animations: [
    trigger('changeTrigger', [
      state('out', style({
        transform: 'translate3d(150%,0,0)'
      })),
      state('in', style({
        transform: 'translate3d(70%,0,0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ])
  ]
})

export class HamlistComponent{
  @Input() currentState;

}
