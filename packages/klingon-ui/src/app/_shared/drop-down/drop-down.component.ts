import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  Renderer
} from '@angular/core';

@Component({
  selector: 'app-drop-down',
  template: `
    <mat-divider></mat-divider>
    <header (click)="toggle()">
      <ng-content select="mat-icon"></ng-content>
      <ng-content select=".title"></ng-content>
      <div>
        <ng-content *ngIf=" state === 'keyboard_arrow_down'"  select=".sub-title"></ng-content>
      </div>
      <mat-icon>{{state}}</mat-icon>
    </header>
    <section [class.open]="state == 'keyboard_arrow_up'" >
      <div #contentAreaRef class="content-area" >
        <ng-content select=".content"></ng-content>
      </div>
    </section>
    <mat-divider></mat-divider>
  `,
  styles: [
    `
      :host {
        display: block;
        margin-top: -1px;
      }
      header {
        display: flex;
        cursor: pointer;
        padding: 10px;
        align-items: center;
        justify-content: center;
      }
      header div {
        flex: 1 1 auto;
      }
      div.content-area {
        height: 0;
        overflow: hidden;
        transition: height 450ms cubic-bezier(0.55, 0.055, 0.675, 0.19);
      }
      section.open div.content-area {
        height: initial;
      }
      ::ng-deep mat-icon {
        margin: 0 10px 0 0;
      }
      ::ng-deep .title {
        margin: 0;
        font-size: 1em;
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
        padding: 0 20px;
      }
    `
  ]
})
export class DropDownComponent implements OnInit {
  @Input()
  open: boolean = false;
  @Input()
  contentHeight: string = '30px';

  @ViewChild('contentAreaRef')
  contentAreaRef: ElementRef;

  state = 'keyboard_arrow_down';

  constructor(public r: Renderer) {}

  ngOnInit() {
    this.state = this.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  toggle() {
    if (this.state === 'keyboard_arrow_up') {
      this.r.setElementStyle(this.contentAreaRef.nativeElement, 'height', '0');
      this.state = 'keyboard_arrow_down';
    } else {
      this.r.setElementStyle(
        this.contentAreaRef.nativeElement,
        'height',
        this.contentHeight
      );
      this.state = 'keyboard_arrow_up';
    }
  }
}
