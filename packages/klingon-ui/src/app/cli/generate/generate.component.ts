import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FlagsComponent } from '../flags/flags.component';
import { CliService } from '../cli.service';

@Component({
  selector: 'app-cli-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css', '../flags/flags.component.css']
})
export class CliGenerateComponent extends FlagsComponent implements OnInit {

  form: FormGroup;
  defaultStyleExt = 'css';
  styleExt = [this.defaultStyleExt, 'scss', 'less', 'sass', 'styl'];

  changeDetection = ['Default', 'OnPush'];

  constructor(public cli: CliService) {
    super();
    this.form = this.buildForm(FlagsComponent.Flags.GENERATE);
  }

  ngOnInit() {

  }

  stop() {

  }

  generate() {
    this.isWorking = true;
    this.cli
      .runNgCommand(
        `generate component ${this.form.value['component-name']} ${this.cli.serialize(
          this.form.value)}`,
        this.form.value['root-dir'] + '/' + this.form.value['app-name'])
      .subscribe(data => {
        this.isWorking = false;

        if (data.stderr) {
          this.onStdErr.next(data.stderr);
        } else {
          this.onStdOut.next(data.stdout);
        }
      });
  }

}
