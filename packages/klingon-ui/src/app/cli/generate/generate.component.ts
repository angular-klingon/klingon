import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FlagsComponent } from '../flags/flags.component';
import { CliService } from '../cli.service';

@Component({
  selector: 'app-cli-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.css', '../flags/flags.component.css']
})
export class CliGenerateComponent extends FlagsComponent implements OnInit {

  form: FormGroup;

  generateConfig: any = { component: false };

  constructor(public cli: CliService) {
    super();
    this.form = this.buildForm(FlagsComponent.Flags.GENERATE);
  }

  ngOnInit() {

  }

  stop() {

  }

  generate() {
    // Do nothing if generate process is already going on
    if (this.isWorking) {
      return;
    }

    // Generate component if all required fields are entered.
    if (this.isValidComponent()) {
      const componentFormGroups: FormGroup[] = this.form.controls.components['controls'];
      componentFormGroups.forEach(componentGroup => {
        this.generateComponent(componentGroup);
      });
    }
  }

  /**
   * Generate Components
   */
  generateComponent(component: FormGroup) {
    this.isWorking = true;
    this.cli
      .runNgCommand(
        `generate component ${component.value['component-name']} ${this.cli.serialize(
          component.value)}`,
        this.form.value['root-dir'] + '/' + this.form.value['app-name'])
      .subscribe(data => {
        this.isWorking = false;

        if (data.stderr) {
          this.onStdErr.next(data.stderr);
        } else {
          this.onStdOut.next(data.stdout);
          this.onStdOut.next(`\n${component.value['component-name']} generated successfully\n`);
          this.form.controls.components['controls'] = [];
          this.generateConfig.component = false;
        }
      });
  }

  /**
   * Event handler of onComponentAdded Event.
   *
   * Subscribe to the newly added component.
   * Checks total number of valid components on the change event of component values.
   */
  addComponent(component: FormGroup) {
    component.valueChanges.subscribe((data: any) => {
      this.generateConfig.component = this.isValidComponent();
    });
  }

  /**
   * Event handler of onComponentRemoved Event.
   * It checks total number of valid components after a component is removed and enable generate form accordingly
   */
  removeComponent(index) {
    this.generateConfig.component = this.isValidComponent();
  }

  /**
   * Check if required fields of all added components are filled and then check/uncheck checkbox accordingly
   */
  isValidComponent() {
    const formGroups: FormGroup[] = this.form.controls.components['controls'];
    const validComponents = formGroups.filter((formGroup: FormGroup) => formGroup.controls['component-name'].valid);
    return validComponents.length > 0 && validComponents.length === formGroups.length;
  }

}
