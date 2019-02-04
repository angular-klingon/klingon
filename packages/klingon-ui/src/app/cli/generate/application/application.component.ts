import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  viewEncapsulation: string[] = ['Emulated', 'Native', 'None', 'ShadowDom'];
  defaultStyleExt = 'css';
  styleExt = [this.defaultStyleExt, 'scss', 'less', 'sass', 'styl'];

  constructor() { }

  ngOnInit() {
  }

}
