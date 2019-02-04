import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent {

  @Input()
  public form: FormGroup;

  @Input()
  public index: number;

  @Output()
  onModuleAdded: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Output()
  onModuleRemoved: EventEmitter<any> = new EventEmitter<any>();

  formControls: FormControl[];

  routingScopes: string[] = ['Child', 'Root'];

  static buildModuleForm() {
    return new FormGroup({
      'module-name': new FormControl('', Validators.required),
      'module': new FormControl(''),
      'project': new FormControl(''),
      'routing-scope': new FormControl(''),
      'routing': new FormControl(false),
      'flat': new FormControl(false)
    });
  }

  addNewModule(event) {
    const formGroup = ModuleComponent.buildModuleForm();
    this.form.controls.modules['controls'].push(formGroup);
    this.onModuleAdded.emit(formGroup);
  }

  removeModule(index) {
    this.form.controls.modules['controls'].splice(index, 1);
    this.onModuleRemoved.emit(index);
  }
}
