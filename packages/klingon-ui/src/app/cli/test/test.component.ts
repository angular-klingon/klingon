import { FlagsComponent } from './../flags/flags.component';
import { CliService } from './../cli.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cli-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css', '../flags/flags.component.css']
})
export class CliTestComponent extends FlagsComponent implements OnInit {
  constructor(public cli: CliService) {
    super();
    this.form = this.buildForm(FlagsComponent.Flags.TEST);
  }

  ngOnInit() {}

  run() {
    this.isWorking = true;
    this.cli
      .runNgCommand(`test ${this.cli.serialize(this.form.value)}`)
      .subscribe( (data: any) => {
        this.isWorking = false;

        if (data.stderr) {
          this.onStdErr.next(data.stderr);
        } else {
          this.onStdOut.next(data.stdout);
        }
      });
  }

  stop() {
    // this.cli.runCommand.stop();
  }
}
