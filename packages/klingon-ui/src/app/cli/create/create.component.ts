import { FlagsComponent } from './../flags/flags.component';
import { CliService } from './../cli.service';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-cli-create",
  templateUrl: "./create.component.html",
  styleUrls: [
    "./create.component.css",
    "../flags/flags.component.css"
  ]
})
export class CliCreateComponent extends FlagsComponent implements OnInit {
  
  form: FormGroup;
  styleExt = ['css', 'scss','less','sass','styl'];

  constructor(
    public cli: CliService) {
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

  run(extra='') {
    this.isWorking = true;
    this.cli.runNgCommand(`new ${this.form.value['app-name']} ${this.cli.serialize(this.form.value)} ${extra}`)
      .subscribe(data => {
        this.isWorking = false;
        
        if (data.stderr) {
          this.onStdErr.next(data.stderr);
        }
        else {
          this.onStdOut.next(data.stdout);
        }
      });
  }
}
