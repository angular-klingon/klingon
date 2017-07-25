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
  
  environments = ['developement', 'production'];
  i18nFormats = ['xlf', 'xlf2', 'xmb', 'xtb'];
  locales = ['fr', 'en'];
  hashings = ['none', 'all', 'media', 'bundles'];
  targets = ['development', 'production'];
  form: FormGroup;

  constructor() {
    this.form = this.buildForm();
  }

  ngOnInit() {}

  buildForm() {
    return new FormGroup({
      "host": new FormControl("127.0.0.1"),
      hmr: new FormControl(false),
      "live-reload": new FormControl(true),
      "public-host": new FormControl(),
      "disable-host-check": new FormControl(false),
      open: new FormControl(false),
      port: new FormControl("4200"),
      ssl: new FormControl(),
      "ssl-cert": new FormControl(),
      "ssl-key": new FormControl(),
      aot: new FormControl(),
      "base-href": new FormControl("/"),
      "deploy-url": new FormControl(),
      environment: new FormControl("development"),
      "extract-css": new FormControl(),
      "i18n-file": new FormControl(),
      "i18n-format": new FormControl(),
      locale: new FormControl(),
      "output-hashing": new FormControl(),
      "output-path": new FormControl(),
      poll: new FormControl(),
      progress: new FormControl(true),
      sourcemap: new FormControl(),
      target: new FormControl("development"),
      "vendor-chunk": new FormControl(true),
      verbose: new FormControl(false),
      watch: new FormControl()
    });
  }
}
