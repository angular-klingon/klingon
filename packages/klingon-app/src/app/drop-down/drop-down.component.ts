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
        <ng-content select=".title"></ng-content>
        <div>
          <ng-content *ngIf=" state === 'keyboard_arrow_down'"  select=".sub-title"></ng-content>
        </div>
        <md-icon>{{state}}</md-icon>
      </header>
      <div #contentAreaRef class="content-area" [class.open]="state == 'keyboard_arrow_up'" >
        <ng-content select=".content"></ng-content>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block; padding: 10px 0;
    }
    header {
      display: flex; cursor: pointer;
      margin-bottom: 30px;
    }
    header div {
      flex: 1 1 auto;
    }
    .content-area {
      height: 0; 
      overflow: hidden; 
      transition: height 100ms linear;
    }
    .content-area.open { 
      height: initial;
    }
    ::ng-deep .title {
      margin: 0; 
      margin: 0; 
      min-width: 30vw; 
    }
    ::ng-deep .sub-title {
      padding: 6px;
      margin: 0;
      flex: 1 1 auto;
      color: grey;
      font-weight: 300;
      font-size: 0.8em;
      text-align: right;
    }
    ::ng-deep .content {
      min-height: 50px;
    }
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
