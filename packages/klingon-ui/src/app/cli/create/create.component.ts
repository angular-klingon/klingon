import { FlagsComponent } from './../flags/flags.component';
import { CliService } from './../cli.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ImportService } from '../../_shared/utilities/import.service';

@Component({
  selector: 'app-cli-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css', '../flags/flags.component.css'],
  providers: [ImportService]
})
export class CliCreateComponent extends FlagsComponent implements OnInit {
  form: FormGroup;
  defaultStyleExt = 'css';
  styleExt = [this.defaultStyleExt, 'scss', 'less', 'sass', 'styl'];

  constructor(public cli: CliService, public _import: ImportService) {
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

    this.isWorking = true;
    this.cli
      .runNgCommand(
        `new ${this.form.value['app-name']} ${this.cli.serialize(
          this.form.value
        )} ${extra}`,
        rootDir
      )
      .subscribe(data => {
        this.isWorking = false;

        if (data.stderr) {
          this.onStdErr.next(data.stderr);
        } else {
          this.onStdOut.next(data.stdout);
        }
      });
  }

  import(event: DragEvent) {
    this._import.import(event.dataTransfer).then((success: any) => {
      this.form.controls['directory'].setValue(success.directory);
      this.form.controls['skip-git'].setValue(success['skip-git']);
      this.form.controls['app-name'].setValue(success['app-name']);
      this.form.controls['prefix'].setValue(success.prefix);

      /**
      * Browser doesn't return full path of root directory due to security reasons.
      * So, let the root-dir field have current value
      */
      this.form.controls['root-dir'].setValue(this.form.controls['root-dir'].value);
      this.form.controls['inline-style'].setValue(success['inline-style']);
      this.form.controls['inline-template'].setValue(success['inline-template']);
      this.form.controls['skip-tests'].setValue(success['skip-tests']);
      this.form.controls['style'].setValue(success.style ? success.style : this.defaultStyleExt);
      this.form.controls['skip-install'].setValue(success['skip-install']);
      this.form.controls['routing'].setValue(success.routing);

      this.form.controls['verbose'].setValue(false);
      this.form.controls['dry-run'].setValue(false);

      this.onStdOut.next(success['app-name'] + ' project imported successfully.');
    }).catch(error => {
      this.onStdErr.next(error);
    });
  }
}
