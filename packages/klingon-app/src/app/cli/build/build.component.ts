import { FlagsComponent } from './../flags/flags.component';
import { FormControl } from '@angular/forms';
import { TerminalService } from './../../terminal/terminal.service';
import { CliService } from './../cli.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-cli-build",
  templateUrl: "./build.component.html",
  styleUrls: [
    "./build.component.css",
    "../flags/flags.component.css"
  ]
})
export class BuildComponent extends FlagsComponent implements OnInit {

  constructor(
    public term: TerminalService,
    public cli: CliService
  ) {
    super();
    this.form = this.buildForm(FlagsComponent.Flags.BUILD);
  }

  ngOnInit() {}

  build() {
    this.term.send(`ng build ${ this.cli.serialize(this.form.value)}`);
  }

}
