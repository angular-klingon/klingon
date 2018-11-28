import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cli-flags',
  template: '@NotImplemented',
  styles: ['./flags.component.css']
})
export class FlagsComponent implements OnInit {

  static Flags = {
    CREATE: 0,
    SERVE: 1,
    BUILD: 2,
    TEST: 3,
    GENERATE: 4
  };

  @Output()
  onStdErr: EventEmitter<string>;
  @Output()
  onStdOut: EventEmitter<string>;

  public isWorking: boolean;

  form: FormGroup;

  logLevels = ['silent', 'verbose', 'silly'];
  browsers = ['chrome', 'firefox', 'phantom'];
  environments = ['dev', 'prod'];
  i18nFormats = ['xlf', 'xlf2', 'xmb', 'xtb'];
  locales = ['fr', 'en'];
  hashings = ['none', 'all', 'media', 'bundles'];
  targets = ['development', 'production'];

  constructor() {
    this.onStdErr = new EventEmitter<string>();
    this.onStdOut = new EventEmitter<string>();
  }

  ngOnInit() {
    this.isWorking = false;
  }

  buildForm(flag: number) {

    const lastUsedRootDirectory = localStorage.getItem(
      'ui.lastUsedRootDirectory'
    );

    if (flag === FlagsComponent.Flags.CREATE) {
      return new FormGroup({
        'app-name': new FormControl('', Validators.required),
        'root-dir': new FormControl(lastUsedRootDirectory),
        directory: new FormControl(''),
        prefix: new FormControl('app'),
        style: new FormControl('css'),
        verbose: new FormControl(false),
        'inline-style': new FormControl(false),
        'inline-template': new FormControl(false),
        'dry-run': new FormControl(false),
        routing: new FormControl(false),
        'skip-git': new FormControl(false),
        'skip-install': new FormControl(false),
        'skip-tests': new FormControl(false)
      });
    } else if (flag === FlagsComponent.Flags.SERVE) {
      return new FormGroup({
        dir: new FormControl(lastUsedRootDirectory),
        host: new FormControl('127.0.0.1'),
        app: new FormControl(''),
        hmr: new FormControl(false),
        'live-reload': new FormControl(true),
        'public-host': new FormControl(),
        'disable-host-check': new FormControl(false),
        open: new FormControl(false),
        port: new FormControl('4200'),
        ssl: new FormControl(false),
        'ssl-cert': new FormControl(),
        'ssl-key': new FormControl(),
        aot: new FormControl(false),
        'base-href': new FormControl('/'),
        'proxy-config': new FormControl(''),
        'deploy-url': new FormControl(),
        'i18n-file': new FormControl(),
        'i18n-format': new FormControl(),
        locale: new FormControl(),
        'output-path': new FormControl(),
        poll: new FormControl(),
        progress: new FormControl(true),
        // target: new FormControl(this.targets[0]),
        'vendor-chunk': new FormControl(true),
        verbose: new FormControl(false),
        watch: new FormControl(false)
      });
    } else if (flag === FlagsComponent.Flags.BUILD) {
      return new FormGroup({
        aot: new FormControl(false),
        app: new FormControl(''),
        'base-href': new FormControl('/'),
        'deploy-url': new FormControl('/'),
        environment: new FormControl(this.environments[0]),
        'extract-css': new FormControl(false),
        'i18n-file': new FormControl(''),
        'i18n-format': new FormControl(''),
        locale: new FormControl(''),
        'output-hashing': new FormControl(''),
        'output-path': new FormControl(''),
        'delete-output-path': new FormControl(true),
        poll: new FormControl(''),
        progress: new FormControl(true),
        sourcemap: new FormControl(true),
        'stats-json': new FormControl(false),
        target: new FormControl(this.targets[0]),
        'vendor-chunk': new FormControl(true),
        'common-chunk': new FormControl(true),
        verbose: new FormControl(false),
        watch: new FormControl(false),
        'show-circular-dependencies': new FormControl(false),
        'build-optimizer': new FormControl(false),
        'named-chunks': new FormControl(false)
      });
    } else if (flag === FlagsComponent.Flags.TEST) {
      return new FormGroup({
        app: new FormControl(''),
        browsers: new FormControl(this.browsers[0]),
        'code-coverage': new FormControl(false),
        colors: new FormControl(''),
        config: new FormControl(''),
        environment: new FormControl(this.environments[0]),
        'log-level': new FormControl(this.logLevels[0]),
        poll: new FormControl(''),
        port: new FormControl(''),
        progress: new FormControl(true),
        reporters: new FormControl(''),
        'single-run': new FormControl(true),
        sourcemap: new FormControl(true),
        watch: new FormControl(false)
      });
    } else if (flag === FlagsComponent.Flags.GENERATE) {
      return new FormGroup({
        'app-name': new FormControl('', Validators.required),
        'root-dir': new FormControl(lastUsedRootDirectory),
        'component-name': new FormControl(''),
        'change-detection': new FormControl(''),
        'dryRun': new FormControl(false),
        'entry-component': new FormControl(false),
        'export': new FormControl(false),
        'flat': new FormControl(false),
        'force': new FormControl(false),
        'module': new FormControl(''),
        'prefix': new FormControl(''),
        'project': new FormControl(''),
        'selector': new FormControl(''),
        'styleext': new FormControl(''),
        'inline-style': new FormControl(false),
        'inline-template': new FormControl(false),
        'lint-fix': new FormControl(false),
        'skip-import': new FormControl(false),
        'spec': new FormControl(false)
      });
    }
  }
}
