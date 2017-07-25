import { CliService } from './../cli.service';
import { TerminalService } from './../../terminal/terminal.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-cli-serve",
  templateUrl: "./serve.component.html",
  styleUrls: ["./serve.component.css"]
})
export class CliServeComponent implements OnInit {
  
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

  serve() {
    this.term.send(`ng serve ${ this.cli.serialize(this.form.value)}`);
  }

  stop() {
    this.term.stop();
  }

  buildForm() {
    return new FormGroup({
      "host": new FormControl("127.0.0.1"),
      hmr: new FormControl(false),
      "live-reload": new FormControl(true),
      "public-host": new FormControl(),
      "disable-host-check": new FormControl(false),
      open: new FormControl(false),
      port: new FormControl("4200"),
      ssl: new FormControl(false),
      "ssl-cert": new FormControl(),
      "ssl-key": new FormControl(),
      aot: new FormControl(false),
      "base-href": new FormControl("/"),
      "proxy-config": new FormControl(""),
      "deploy-url": new FormControl(),
      environment: new FormControl(this.environments[0]),
      "extract-css": new FormControl(false),
      "i18n-file": new FormControl(),
      "i18n-format": new FormControl(),
      locale: new FormControl(),
      "output-hashing": new FormControl(false),
      "output-path": new FormControl(),
      poll: new FormControl(),
      progress: new FormControl(false),
      sourcemap: new FormControl(true),
      target: new FormControl(this.targets[0]),
      "vendor-chunk": new FormControl(true),
      verbose: new FormControl(false),
      watch: new FormControl(false)
    });
  }
}
