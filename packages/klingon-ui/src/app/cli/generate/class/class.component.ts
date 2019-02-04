import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent {

  @Input()
  public form: FormGroup;

  @Input()
  public index: number;

  @Output()
  onClassAdded: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Output()
  onClassRemoved: EventEmitter<any> = new EventEmitter<any>();

  formControls: FormControl[];

  static buildClassForm() {
    return new FormGroup({
      'class-name': new FormControl('', Validators.required),
      'project': new FormControl(''),
      'type': new FormControl(''),
      'spec': new FormControl(false)
    });
  }


  addNewClass(event) {
    const formGroup = ClassComponent.buildClassForm();
    this.form.controls.classes['controls'].push(formGroup);
    console.log(this.form.controls.classes);
    this.onClassAdded.emit(formGroup);
  }

  removeClass(index) {
    this.form.controls.classes['controls'].splice(index, 1);
    this.onClassRemoved.emit(index);
  }

}
