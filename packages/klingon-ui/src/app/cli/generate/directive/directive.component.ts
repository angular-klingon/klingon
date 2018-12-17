import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-directive',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent {

  @Input()
  public form: FormGroup;

  @Input()
  public index: number;

  @Output()
  onDirectiveAdded: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Output()
  onDirectiveRemoved: EventEmitter<any> = new EventEmitter<any>();

  formControls: FormControl[];

  static buildDirectiveForm() {
    return new FormGroup({
      'directive-name': new FormControl('', Validators.required),
      'prefix': new FormControl(''),
      'project': new FormControl(''),
      'selector': new FormControl(''),
      'export': new FormControl(false),
      'flat': new FormControl(false),
      'lint-fix': new FormControl(false),
      'skip-import': new FormControl(false),
      'spec': new FormControl(false)
    });
  }
  
  addNewDirective(event) {
    const formGroup = DirectiveComponent.buildDirectiveForm();
    this.form.controls.directives['controls'].push(formGroup);
    console.log(this.form.controls.directives);
    this.onDirectiveAdded.emit(formGroup);
  }

  removeDirective(index) {
    this.form.controls.directives['controls'].splice(index, 1);
    this.onDirectiveRemoved.emit(index);
  }
}
