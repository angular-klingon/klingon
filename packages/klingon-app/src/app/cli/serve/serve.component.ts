import { FlagsComponent } from './../flags/flags.component';
import { CliService } from './../cli.service';
import { TerminalService } from './../../terminal/terminal.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-cli-serve",
  templateUrl: "./serve.component.html",
  styleUrls: [
    "./serve.component.css",
    "../flags/flags.component.css"
  ]
})
export class CliServeComponent extends FlagsComponent implements OnInit {

  constructor(
    public term: TerminalService,
    public cli: CliService
  ) {
    super();
    this.form = this.buildForm(FlagsComponent.Flags.SERVE);
  }

  ngOnInit() {}

  serve() {
    this.term.send(`ng serve ${ this.cli.serialize(this.form.value)}`);
  }

  stop() {
    this.term.stop();
  }
}
