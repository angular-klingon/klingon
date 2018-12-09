import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-generate-component',
  templateUrl: './component.component.html',
  styles: [`
    .component-form mat-form-field {
      width: 100%
    }

    mat-action-row {
      border: none;
    }
  `]
})
export class ComponentComponent {

  @Input()
  public form: FormGroup;

  @Input()
  public index: number;

  @Output()
  onComponentAdded: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Output()
  onComponentRemoved: EventEmitter<any> = new EventEmitter<any>();

  formControls: FormControl[];

  changeDetection: string[] = ['Default', 'OnPush'];
  defaultStyleExt = 'css';
  styleExt = [this.defaultStyleExt, 'scss', 'less', 'sass', 'styl'];

  componentName: string;

  static buildComponentForm() {
    return new FormGroup({
      'component-name': new FormControl(''),
      'change-detection': new FormControl(''),
      'dryRun': new FormControl(false),
      'entry-component': new FormControl(false),
      'export': new FormControl(false),
      'flat': new FormControl(false),
      'force': new FormControl(false),
      'module': new FormControl(''),
      'prefix': new FormControl(''),
      'project': new FormControl(''),
      'selector': new FormControl(''),
      'styleext': new FormControl(''),
      'inline-style': new FormControl(false),
      'inline-template': new FormControl(false),
      'lint-fix': new FormControl(false),
      'skip-import': new FormControl(false),
      'spec': new FormControl(false)
    });
  }

  addNewComponent(event) {
    const formGroup = ComponentComponent.buildComponentForm();
    this.form.controls.components['controls'].push(formGroup);
    this.onComponentAdded.emit(formGroup);
  }

  removeComponent(index) {
    this.form.controls.components['controls'].splice(index, 1);
    this.onComponentRemoved.emit(index);
  }

}
