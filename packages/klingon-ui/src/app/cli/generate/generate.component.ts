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

  generateConfig: any = {
    component: false, class: false, directive: false, enum: false,
    interface: false, module: false, pipe: false, service: false
  };

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

    // Generate modules if all required fields are entered.
    if (this.isValid(this.form.controls.modules)) {
      const moduleFormGroups: FormGroup[] = this.form.controls.modules['controls'];
      moduleFormGroups.forEach(async moduleGroup => {
        await new Promise(resolve => setTimeout(resolve, 0, this.generateModule(moduleGroup)));
      });
      this.form.controls.modules['controls'] = [];
      this.generateConfig.module = false;
    }

    // Generate pipes if all required fields are entered.
    if (this.isValid(this.form.controls.pipes)) {
      const pipeFormGroups: FormGroup[] = this.form.controls.pipes['controls'];
      pipeFormGroups.forEach(async pipeGroup => {
        await new Promise(resolve => setTimeout(resolve, 0, this.generatePipe(pipeGroup)));
      });
      this.form.controls.pipes['controls'] = [];
      this.generateConfig.pipe = false;
    }

    // Generate services if all required fields are entered.
    if (this.isValid(this.form.controls.services)) {
      const serviceFormGroups: FormGroup[] = this.form.controls.services['controls'];
      serviceFormGroups.forEach(async serviceGroup => {
        await new Promise(resolve => setTimeout(resolve, 0, this.generateService(serviceGroup)));
      });
      this.form.controls.services['controls'] = [];
      this.generateConfig.service = false;
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
   * Generate Modules
   */
  generateModule(module: FormGroup) {
    return new Promise((resolve, reject) => {
      this.isWorking = true;
      this.cli
        .runNgCommand(
          `generate module ${module.value['module-name']} ${this.cli.serialize(
            module.value)}`,
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
   * Generate Modules
   */
  generatePipe(pipe: FormGroup) {
    return new Promise((resolve, reject) => {
      this.isWorking = true;
      this.cli
        .runNgCommand(
          `generate pipe ${pipe.value['pipe-name']} ${this.cli.serialize(
            pipe.value)}`,
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
   * Generate Services
   */
  generateService(service: FormGroup) {
    return new Promise((resolve, reject) => {
      this.isWorking = true;
      this.cli
        .runNgCommand(
          `generate service ${service.value['service-name']} ${this.cli.serialize(
            service.value)}`,
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

  addModule(module: FormGroup) {
    module.valueChanges.subscribe((data: any) => {
      this.generateConfig.module = this.isValid(this.form.controls.modules);
      console.log(this.generateConfig);
    });
  }

  addPipe(pipe: FormGroup) {
    pipe.valueChanges.subscribe((data: any) => {
      this.generateConfig.pipe = this.isValid(this.form.controls.pipes);
      console.log(this.generateConfig);
    });
  }

  addService(service: FormGroup) {
    service.valueChanges.subscribe((data: any) => {
      this.generateConfig.service = this.isValid(this.form.controls.services);
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

  removeModule(index) {
    this.generateConfig.module = this.isValid(this.form.controls.modules);
  }

  removePipe(index) {
    this.generateConfig.pipe = this.isValid(this.form.controls.pipes);
  }

  removeService(index) {
    this.generateConfig.service = this.isValid(this.form.controls.services);
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
