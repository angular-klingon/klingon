import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'app-drop-down',
  template: `
    <section>
      <header (click)="toggle()">
        <ng-content select="h3"></ng-content>
        <md-icon>{{state}}</md-icon>
      </header>
      <div class="content-area" [class.open]="state == 'keyboard_arrow_up'">
        <ng-content select="main"></ng-content>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; padding: 10px 0; }
    :host header { display: flex; cursor: pointer; }
    .content-area { height: 0; overflow: hidden; transition: height 100ms linear; }
    .content-area.open { height: 600px; }
    ::ng-deep h3 { margin: 0; flex: 1 1 auto; }
    ::ng-deep main { min-height: 50px; }
  `]
})
export class DropDownComponent implements OnInit {

  @Input() open: boolean = false;

  state = 'keyboard_arrow_down';

  constructor() { }

  ngOnInit() {
    this.state = this.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  toggle() {
    this.state = this.state === 'keyboard_arrow_down' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

}
