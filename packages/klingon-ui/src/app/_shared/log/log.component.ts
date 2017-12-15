import { Component, OnInit, Input, SimpleChange } from "@angular/core";

export interface StdSimpleChange extends SimpleChange {
  stderr: {currentValue:string};
  stdout: {currentValue:string};
}

@Component({
  selector: 'app-cli-log',
  template: `
    <!--<button mat-raised-button (click)="clear()">Clear</button> <br/>-->
    <section>
      <code *ngFor="let logItem of logs"  [ngClass]="{ hasError: !!logItem.isError }"  [innerText]="logItem.text"></code>
    </section>
  `,
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  @Input() stdout: string;
  @Input() stderr: string;

  logs: {text: string; isError?: boolean}[];

  keepHistory: boolean;

  constructor() {
    this.logs = [];
    this.keepHistory = true;
  }

  ngOnInit() {
  }

  clear() {
    this.logs = [];
  }

  ngOnChanges(r: StdSimpleChange) {
    if (r.stderr && r.stderr.currentValue) {
      this.logs.push({
        text: r.stderr.currentValue,
        isError: true
      });
    }
    if (r.stdout && r.stdout.currentValue) {
      this.logs.push({
        text: r.stdout.currentValue,
        isError: false
      });
    }
  }

}
