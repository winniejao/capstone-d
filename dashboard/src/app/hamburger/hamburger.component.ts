import { Component } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css']
})
export class HamburgerComponent {
  nextState = 'out';
  changeState() {
    this.nextState = this.nextState === 'out'? 'in' : 'out';
  }
}
