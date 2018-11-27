import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-drop-down',
  template: `
    <mat-accordion>
      <mat-expansion-panel [expanded]="open" [disabled]="disabled" (opened)="open=true" (closed)="open=false">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <ng-content select="mat-icon"></ng-content>
            <ng-content select=".title"></ng-content>
          </mat-panel-title>
          <mat-panel-description *ngIf="!open">
            <ng-content select=".sub-title"></ng-content>
          </mat-panel-description>
        </mat-expansion-panel-header>
        <ng-content select=".content"></ng-content>
      </mat-expansion-panel>
    </mat-accordion>
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
        margin: 3px 0px 0px 0px;
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
  disabled: boolean = false;

  ngOnInit() {
  }

}
