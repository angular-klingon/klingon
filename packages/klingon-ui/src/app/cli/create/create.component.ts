import { FlagsComponent } from './../flags/flags.component';
import { CliService } from './../cli.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TerminalService } from '../../_shared/terminal/terminal.service';

@Component({
  selector: 'app-cli-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css', '../flags/flags.component.css']
})
export class CliCreateComponent extends FlagsComponent implements OnInit {
  form: FormGroup;
  styleExt = ['css', 'scss', 'less', 'sass', 'styl'];

  constructor(public cli: CliService, public terminal: TerminalService) {
    super();
  }

  ngOnInit() {
    this.form = this.buildForm(FlagsComponent.Flags.CREATE);
  }

  dryRun() {
    this.run('--dry-run=true');
  }

  create() {
    this.run();
  }

  run(extra = '') {
    // save project directory to local storage to remember next time
    const rootDir = this.form.value['root-dir'];
    localStorage.setItem('ui.lastUsedRootDirectory', rootDir || '');

    const appName = this.form.value['directory'] || this.form.value['app-name'];

    this.isWorking = true;
    this.cli
      .runNgCommand(
        `new ${this.form.value['app-name']} ${this.cli.serialize(
          this.form.value
        )} ${extra}`,
        rootDir
      )
      .subscribe( (data: any) => {
        this.isWorking = false;

        /**
         * exit event of ng command returns exit code (0/1). So if it returns 0, means project was created successfully. Only then
         * we change directory to project directory. Otherwise leave as it is
         */
        if (data.exit === 0) {
          this.terminal.command(`cd ` + (rootDir + '/' + appName));
        }

        if (data.stderr) {
          this.onStdErr.next(data.stderr);
        } else {
          this.onStdOut.next(data.stdout);
        }
      });
  }
}
