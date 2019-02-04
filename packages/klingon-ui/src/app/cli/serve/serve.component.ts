import { FlagsComponent } from './../flags/flags.component';
import { CliService } from './../cli.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cli-serve',
  templateUrl: './serve.component.html',
  styleUrls: ['./serve.component.css', '../flags/flags.component.css']
})
export class CliServeComponent extends FlagsComponent implements OnInit {
  constructor(public cli: CliService) {
    super();
    this.form = this.buildForm(FlagsComponent.Flags.SERVE);
  }

  ngOnInit() {}

  serve() {
    this.isWorking = true;
    this.cli
      .runNgCommand(`serve ${this.cli.serialize(this.form.value)}`, this.form.value['dir'] + '/' + this.form.value['app'])
      .subscribe((data: any) => {
        this.isWorking = false;

        if (data.stderr) {
          this.onStdErr.next(data.stderr);
        } else {
          this.onStdOut.next(data.stdout);
        }
      });
  }

  stop() {
    // this.cli.stop();
  }
}
