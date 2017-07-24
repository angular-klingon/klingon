import { TerminalService } from './../terminal.service';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener
} from "@angular/core";

@Component({
  selector: 'app-terminal',
  template: `
    <section>
      <main #terminalRef ></main>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      bottom: 0;
      background: black;
      width: 100%;
    }

    main {
        width: 100%;
        height: 200px;
        padding: 10px;
    }
  `]
})
export class TerminalComponent implements OnInit {

  @ViewChild('terminalRef') terminalRef: ElementRef;

  @Output() open: EventEmitter<boolean>;
  @Output() close: EventEmitter<boolean>;
  @Output() key: EventEmitter<string>;
  @Output() keydown: EventEmitter<string>;
  @Output() keypress: EventEmitter<string>;
  @Output() scroll: EventEmitter<number>;
  @Output() resize: EventEmitter<{terminal: HTMLElement, cols: number, rows: number}>;
  @Output() title: EventEmitter<string>;

  constructor(public term: TerminalService) {
    this.open = new EventEmitter();
    this.close = new EventEmitter();
    this.key = new EventEmitter();
    this.keydown = new EventEmitter();
    this.keypress = new EventEmitter();
    this.scroll = new EventEmitter();
    this.resize = new EventEmitter();
    this.title = new EventEmitter();
  }

  ngOnInit() {
    this.term.createTerminal(this.terminalRef.nativeElement);

    this.terminalRef.nativeElement.addEventListener('open', this.onOpen.bind(this));
    this.terminalRef.nativeElement.addEventListener('close', this.onClose.bind(this));
    this.terminalRef.nativeElement.addEventListener('key', this.onKey.bind(this));
    this.terminalRef.nativeElement.addEventListener('keydown', this.onKeydown.bind(this));
    this.terminalRef.nativeElement.addEventListener('keypress', this.onKeypress.bind(this));
    this.terminalRef.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
    this.terminalRef.nativeElement.addEventListener('resize', this.onResize.bind(this));
    this.terminalRef.nativeElement.addEventListener('title', this.onTitle.bind(this));
  }

  onOpen(event) {
    debugger;
    this.open.emit();
  }

  onClose(event) {
    this.close.emit();
  }

  onKey(event) {
    this.key.emit();
  }

  onKeydown(event) {
    this.keydown.emit();
  }

  onKeypress(event) {
    this.keypress.emit();
  }

  onScroll(event) {
    this.scroll.emit();
  }

  onResize(event) {
    this.resize.emit();
  }

  onTitle(event) {
    this.title.emit();
  }

}
