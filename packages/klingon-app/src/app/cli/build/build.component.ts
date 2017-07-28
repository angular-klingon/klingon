import { FormControl } from '@angular/forms';
import { TerminalService } from './../../terminal/terminal.service';
import { CliService } from './../cli.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cli-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent implements OnInit {

  environments = ['dev', 'prod'];
  i18nFormats = ['xlf', 'xlf2', 'xmb', 'xtb'];
  locales = ['fr', 'en'];
  hashings = ['none', 'all', 'media', 'bundles'];
  targets = ['development', 'production'];
  form: FormGroup;

  constructor(
    public term: TerminalService,
    public cli: CliService
  ) {
    this.form = this.buildForm();
  }

  ngOnInit() {}

  build() {
    this.term.send(`ng build ${ this.cli.serialize(this.form.value)}`);
  }

  buildForm() {
    return new FormGroup({
      "aot": new FormControl(false),
      "app": new FormControl(""),
      "base-href": new FormControl("/"),
      "deploy-url": new FormControl("/"),
      "environment": new FormControl(this.environments[0]),
      "extract-css": new FormControl(false),
      "i18n-file": new FormControl(""),
      "i18n-format": new FormControl(""),
      "locale": new FormControl(""),
      "output-hashing": new FormControl(""),
      "output-path": new FormControl(""),
      "delete-output-path": new FormControl(true),
      "poll": new FormControl(""),
      "progress": new FormControl(true),
      "sourcemap": new FormControl(true),
      "stats-json": new FormControl(false),
      "target": new FormControl(this.targets[0]),
      "vendor-chunk": new FormControl(true),
      "common-chunk": new FormControl(true),
      "verbose": new FormControl(false),
      "watch": new FormControl(false),
      "show-circular-dependencies": new FormControl(false),
      "build-optimizer": new FormControl(false),
      "named-chunks": new FormControl(false)
    });
  }
}
