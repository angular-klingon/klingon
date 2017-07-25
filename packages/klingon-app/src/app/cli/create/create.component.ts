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
  
  newForm: FormGroup;
  styleExt = ['css', 'scss','less','sass','styl'];

  constructor(public term: TerminalService) {
    this.newForm = this.buildNewForm();
  }

  ngOnInit() {
  }

  dryRun() {
    this.term.send(`ng new ${this.newForm.value['app-name']} ${this.serialize()} --dry-run=true`);
  }

  create() {
    this.term.send(`ng new ${this.newForm.value['app-name']} ${this.serialize()}`);
  } 

  buildNewForm() {
    return new FormGroup({
      "app-name": new FormControl("", Validators.required),
      directory: new FormControl("/tmp/", Validators.required),
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

  private serialize() {
    const vals = this.newForm.value;
    return Object.keys(vals)
      .filter( key => key !== 'app-name')
      .map( key => `--${key}=${vals[key]}`)
      .join(' ');
  }
}
