import { FlagsComponent } from './../flags/flags.component';
import { FormControl } from '@angular/forms';
import { CliService } from './../cli.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cli-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css', '../flags/flags.component.css']
})
export class BuildComponent extends FlagsComponent implements OnInit {
  constructor(public cli: CliService) {
    super();
    this.form = this.buildForm(FlagsComponent.Flags.BUILD);
  }

  ngOnInit() {}

  build() {
    this.isWorking = true;
    this.cli
      .runNgCommand(`build ${this.cli.serialize(this.form.value)}`)
      .subscribe( (data: any) => {
        this.isWorking = false;

        if (data.stderr) {
          this.onStdErr.next(data.stderr);
        } else {
          this.onStdOut.next(data.stdout);
        }
      });
  }
}
