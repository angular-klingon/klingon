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
    <md-divider></md-divider>
    <header (click)="toggle()">
      <ng-content select="md-icon"></ng-content>
      <ng-content select=".title"></ng-content>
      <div>
        <ng-content *ngIf=" state === 'keyboard_arrow_down'"  select=".sub-title"></ng-content>
      </div>
      <md-icon>{{state}}</md-icon>
    </header>
    <section [class.open]="state == 'keyboard_arrow_up'" >
      <div #contentAreaRef class="content-area" >
        <ng-content select=".content"></ng-content>
      </div>
    </section>
    <md-divider></md-divider>
  `,
  styles: [`
    :host {
      display: block;
    }
    :host section {
      padding: 0;
      opacity: 0;
    }
    :host section.open {
      padding: 20px;
      opacity: 1;
    }
    header {
      display: flex; cursor: pointer;
      padding: 10px;
    }
    header div {
      flex: 1 1 auto;
    }
    div.content-area {
      height: 0; 
      overflow: hidden; 
      transition: height 150ms cubic-bezier(0.550, 0.055, 0.675, 0.190);
    }
    section.open div.content-area { 
      height: initial;
    }
    ::ng-deep md-icon {
      margin: 0 10px 0 0;
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
