import { CliService } from './../cli.service';
import { TerminalService } from './../../terminal/terminal.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-cli-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CliCreateComponent implements OnInit {
  
  form: FormGroup;
  styleExt = ['css', 'scss','less','sass','styl'];

  constructor(
    public term: TerminalService,
    public cli: CliService) {

    this.form = this.buildForm();
  }

  ngOnInit() {
  }

  dryRun() {
    this.term.send(`ng new ${this.form.value['app-name']} ${this.cli.serialize(this.form.value)} --dry-run=true`);
  }

  create() {
    this.term.send(`ng new ${this.form.value['app-name']} ${this.cli.serialize(this.form.value)}`);
  } 

  buildForm() {
    return new FormGroup({
      "app-name": new FormControl("", Validators.required),
      directory: new FormControl(""),
      prefix: new FormControl("app"),
      "source-dir": new FormControl("src"),
      style: new FormControl("css"),
      verbose: new FormControl(false),
      "inline-style": new FormControl(false),
      "inline-template": new FormControl(false),
      "dry-run": new FormControl(false),
      minimal: new FormControl(false),
      routing: new FormControl(false),
      "skip-commit": new FormControl(false),
      "skip-git": new FormControl(false),
      "skip-install": new FormControl(false),
      "skip-tests": new FormControl(false)
    });
  }
}
