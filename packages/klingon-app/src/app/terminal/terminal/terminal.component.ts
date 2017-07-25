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

  async ngOnInit() {
    await this.term.createTerminal(this.terminalRef.nativeElement);
    this.term.send('ng -v');

    this.term.on('open', this.onOpen.bind(this));
    this.term.on('close', this.onClose.bind(this));
    this.term.on('key', this.onKey.bind(this));
    this.term.on('keydown', this.onKeydown.bind(this));
    this.term.on('keypress', this.onKeypress.bind(this));
    this.term.on('scroll', this.onScroll.bind(this));
    this.term.on('resize', this.onResize.bind(this));
    this.term.on('title', this.onTitle.bind(this));
  }

  onOpen(event) {
    //console.log('Terminal::onOpen', event);
    this.open.emit();
  }

  onClose(event) {
    //console.log('Terminal::onClose', event);
    this.close.emit();
  }

  onKey(event) {
    //console.log('Terminal::onKey', event);
    this.key.emit();
  }

  onKeydown(event) {
    //console.log('Terminal::onKeydown', event);
    this.keydown.emit();
  }

  onKeypress(event) {
    //console.log('Terminal::onKeypress', event);
    this.keypress.emit();
  }

  onScroll(event) {
    //console.log('Terminal::onScroll', event);
    this.scroll.emit();
  }

  onResize(event) {
    //console.log('Terminal::onResize', event);
    this.resize.emit();
  }

  onTitle(event) {
    //console.log('Terminal::onTitle', event);
    this.title.emit();
  }

}
