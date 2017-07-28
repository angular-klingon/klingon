import { TerminalService } from './terminal/terminal.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedIndex: number = 0;

  constructor(public term: TerminalService) {
  }

  ngOnInit(){
    this.selectedIndex = parseInt(localStorage.getItem('ui.selectedIndex') || '0', 10);
    localStorage.setItem('ui.selectedIndex', `${this.selectedIndex}`);
  }

  storeIndex(index: number) {
    localStorage.setItem('ui.selectedIndex', `${index}`);
  }
}
