import { FlagsComponent } from './../flags/flags.component';
import { CliService } from './../cli.service';
import { TerminalService } from './../../terminal/terminal.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-cli-create",
  templateUrl: "./create.component.html",
  styleUrls: [
    "./create.component.css",
    "../flags/flags.component.css"
  ]
})
export class CliCreateComponent extends FlagsComponent implements OnInit {
  
  form: FormGroup;
  styleExt = ['css', 'scss','less','sass','styl'];

  constructor(
    public term: TerminalService,
    public cli: CliService) {
    super();
    this.form = this.buildForm(FlagsComponent.Flags.CREATE);
  }

  ngOnInit() {
  }

  dryRun() {
    this.term.send(`ng new ${this.form.value['app-name']} ${this.cli.serialize(this.form.value)} --dry-run=true`);
  }

  create() {
    this.term.send(`ng new ${this.form.value['app-name']} ${this.cli.serialize(this.form.value)}`);
  } 
}
