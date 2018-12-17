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

  generateConfig: any = { component: false, class: false, directive: false, enum: false, interface: false };

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
    if (this.isValid(this.form.controls.components)) {
      const componentFormGroups: FormGroup[] = this.form.controls.components['controls'];
      componentFormGroups.forEach(async componentGroup => {
        await new Promise(resolve => setTimeout(resolve, 0, this.generateComponent(componentGroup)));
      });
      this.form.controls.components['controls'] = [];
      this.generateConfig.component = false;
    }

    // Generate class if all required fields are entered.
    if (this.isValid(this.form.controls.classes)) {
      const classFormGroups: FormGroup[] = this.form.controls.classes['controls'];
      classFormGroups.forEach(async classGroup => {
        await new Promise(resolve => setTimeout(resolve, 0, this.generateClass(classGroup)));
      });
      this.form.controls.classes['controls'] = [];
      this.generateConfig.class = false;
    }

    // Generate directives if all required fields are entered.
    if (this.isValid(this.form.controls.directives)) {
      const directiveFormGroups: FormGroup[] = this.form.controls.directives['controls'];
      directiveFormGroups.forEach(async directiveGroup => {
        await new Promise(resolve => setTimeout(resolve, 0, this.generateDirective(directiveGroup)));
      });
      this.form.controls.directives['controls'] = [];
      this.generateConfig.directive = false;
    }

    // Generate enums if all required fields are entered.
    if (this.isValid(this.form.controls.enums)) {
      const enumFormGroups: FormGroup[] = this.form.controls.enums['controls'];
      enumFormGroups.forEach(async enumGroup => {
        await new Promise(resolve => setTimeout(resolve, 0, this.generateEnum(enumGroup)));
      });
      this.form.controls.enums['controls'] = [];
      this.generateConfig.enum = false;
    }

    // Generate interfaces if all required fields are entered.
    if (this.isValid(this.form.controls.interfaces)) {
      const interfaceFormGroups: FormGroup[] = this.form.controls.interfaces['controls'];
      interfaceFormGroups.forEach(async interfaceGroup => {
        await new Promise(resolve => setTimeout(resolve, 0, this.generateInterface(interfaceGroup)));
      });
      this.form.controls.interfaces['controls'] = [];
      this.generateConfig.interface = false;
    }
  }

  /**
   * Generate Components
   */
  generateComponent(component: FormGroup) {
    return new Promise((resolve, reject) => {
      this.isWorking = true;
      this.cli
        .runNgCommand(
          `generate component ${component.value['component-name']} ${this.cli.serialize(
            component.value)}`,
          this.form.value['root-dir'] + '/' + this.form.value['app-name'])
        .subscribe((data: any) => {
          this.isWorking = false;
          if (data.stderr) {
            this.onStdErr.next(data.stderr);
            reject(data);
          } else {
            if (data.exit === 0) {
              resolve(data);
            } else {
              this.onStdOut.next(data.stdout);
            }
          }
        });
    });
  }

  /**
 * Generate Classes
 */
  generateClass(_class: FormGroup) {
    return new Promise((resolve, reject) => {

      this.isWorking = true;
      this.cli
        .runNgCommand(
          `generate class ${_class.value['class-name']} ${this.cli.serialize(
            _class.value)}`,
          this.form.value['root-dir'] + '/' + this.form.value['app-name'])
        .subscribe((data: any) => {
          this.isWorking = false;
          if (data.stderr) {
            this.onStdErr.next(data.stderr);
            reject(data);
          } else {
            if (data.exit === 0) {
              resolve(data);
            } else {
              this.onStdOut.next(data.stdout);
            }
          }
        });
    });
  }

  /**
   * Generate Directives
   */
  generateDirective(directive: FormGroup) {
    return new Promise((resolve, reject) => {
      this.isWorking = true;
      this.cli
        .runNgCommand(
          `generate directive ${directive.value['directive-name']} ${this.cli.serialize(
            directive.value)}`,
          this.form.value['root-dir'] + '/' + this.form.value['app-name'])
        .subscribe((data: any) => {
          this.isWorking = false;

          if (data.stderr) {
            this.onStdErr.next(data.stderr);
            reject(data);
          } else {
            if (data.exit === 0) {
              resolve(data);
            } else {
              this.onStdOut.next(data.stdout);
            }
          }
        });
    });
  }

  /**
   * Generate Enums
   */
  generateEnum(_enum: FormGroup) {
    return new Promise((resolve, reject) => {
      this.isWorking = true;
      this.cli
        .runNgCommand(
          `generate enum ${_enum.value['enum-name']} ${this.cli.serialize(
            _enum.value)}`,
          this.form.value['root-dir'] + '/' + this.form.value['app-name'])
        .subscribe((data: any) => {
          this.isWorking = false;

          if (data.stderr) {
            this.onStdErr.next(data.stderr);
            reject(data);
          } else {
            if (data.exit === 0) {
              resolve(data);
            } else {
              this.onStdOut.next(data.stdout);
            }
          }
        });
    });
  }

  /**
   * Generate Interfaces
   */
  generateInterface(_interface: FormGroup) {
    return new Promise((resolve, reject) => {
      this.isWorking = true;
      const interfaceType = _interface.value['interface-type'] ? _interface.value['interface-type'] : '';
      this.cli
        .runNgCommand(
          `generate interface ${_interface.value['interface-name']} ${interfaceType} ${this.cli.serialize(
            _interface.value)}`,
          this.form.value['root-dir'] + '/' + this.form.value['app-name'])
        .subscribe((data: any) => {
          this.isWorking = false;

          if (data.stderr) {
            this.onStdErr.next(data.stderr);
            reject(data);
          } else {
            if (data.exit === 0) {
              resolve(data);
            } else {
              this.onStdOut.next(data.stdout);
            }
          }
        });
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
      this.generateConfig.component = this.isValid(this.form.controls.components);
    });
  }

  addClass(_class: FormGroup) {
    _class.valueChanges.subscribe((data: any) => {
      this.generateConfig.class = this.isValid(this.form.controls.classes);
    });
  }

  addDirective(directive: FormGroup) {
    directive.valueChanges.subscribe((data: any) => {
      this.generateConfig.directive = this.isValid(this.form.controls.directives);
      console.log(this.generateConfig);
    });
  }

  addEnum(_enum: FormGroup) {
    _enum.valueChanges.subscribe((data: any) => {
      this.generateConfig.enum = this.isValid(this.form.controls.enums);
      console.log(this.generateConfig);
    });
  }

  addInterface(_interface: FormGroup) {
    _interface.valueChanges.subscribe((data: any) => {
      this.generateConfig.interface = this.isValid(this.form.controls.interfaces);
      console.log(this.generateConfig);
    });
  }

  /**
   * Event handler of onComponentRemoved Event.
   * It checks total number of valid components after a component is removed and enable generate form accordingly
   */
  removeComponent(index) {
    this.generateConfig.component = this.isValid(this.form.controls.components);
  }

  removeClass(index) {
    this.generateConfig.class = this.isValid(this.form.controls.classes);
  }

  /**
   * Event handler of onComponentRemoved Event.
   * It checks total number of valid components after a component is removed and enable generate form accordingly
   */
  removeDirective(index) {
    this.generateConfig.directive = this.isValid(this.form.controls.directives);
  }

  removeEnum(index) {
    this.generateConfig.enum = this.isValid(this.form.controls.enums);
  }

  removeInterface(index) {
    this.generateConfig.interface = this.isValid(this.form.controls.interfaces);
  }

  /**
   * Check if required fields of all added components are filled and then check/uncheck checkbox accordingly
   */
  isValid(generateArray: any) {
    const formGroups: FormGroup[] = generateArray.controls;
    const validComponents = formGroups.filter((formGroup: FormGroup) => formGroup.valid);
    return validComponents.length > 0 && validComponents.length === formGroups.length;
  }

}
