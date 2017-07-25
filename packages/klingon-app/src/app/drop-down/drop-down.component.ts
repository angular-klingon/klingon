import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  Renderer
} from "@angular/core";

@Component({
  selector: 'app-drop-down',
  template: `
    <section>
      <header (click)="toggle()">
        <ng-content select="h3"></ng-content>
        <md-icon>{{state}}</md-icon>
      </header>
      <div #contentAreaRef class="content-area" [class.open]="state == 'keyboard_arrow_up'" >
        <ng-content select="main"></ng-content>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; padding: 10px 0; }
    :host header { display: flex; cursor: pointer; }
    .content-area { height: 0; overflow: hidden; transition: height 100ms linear; }
    .content-area.open { height: initial; }
    ::ng-deep h3 { margin: 0; flex: 1 1 auto; }
    ::ng-deep main { min-height: 50px; }
  `]
})
export class DropDownComponent implements OnInit {

  @Input() open: boolean = false;
  @Input() contentHeight: string = '30px';

  @ViewChild('contentAreaRef') contentAreaRef: ElementRef;

  state = 'keyboard_arrow_down';

  constructor(
    public r: Renderer
  ) { }

  ngOnInit() {
    this.state = this.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  toggle() {
    if (this.state === 'keyboard_arrow_up') {
      this.r.setElementStyle(this.contentAreaRef.nativeElement, 'height', '0');
      this.state = 'keyboard_arrow_down';
    }
    else {
      this.r.setElementStyle(this.contentAreaRef.nativeElement, 'height', this.contentHeight);
      this.state = 'keyboard_arrow_up';
    }
  }

}
