import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FlagsComponent } from '../flags/flags.component';

@Component({
  selector: 'app-cli-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css', '../flags/flags.component.css']
})
export class CliGenerateComponent extends FlagsComponent implements OnInit {

  form: FormGroup;

  constructor() {
    super();
  }

  ngOnInit() {
    this.form = this.buildForm(FlagsComponent.Flags.GENERATE);
  }

}
