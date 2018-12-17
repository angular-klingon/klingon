import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-enum',
  templateUrl: './enum.component.html',
  styleUrls: ['./enum.component.css']
})
export class EnumComponent {

  @Input()
  public form: FormGroup;

  @Input()
  public index: number;

  @Output()
  onEnumAdded: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Output()
  onEnumRemoved: EventEmitter<any> = new EventEmitter<any>();

  formControls: FormControl[];

  static buildEnumForm() {
    return new FormGroup({
      'enum-name': new FormControl('', Validators.required),
      'project': new FormControl(''),
      'lint-fix': new FormControl(false)
    });
  }
  
  addNewEnum(event) {
    const formGroup = EnumComponent.buildEnumForm();
    this.form.controls.enums['controls'].push(formGroup);
    this.onEnumAdded.emit(formGroup);
  }

  removeEnum(index) {
    this.form.controls.enums['controls'].splice(index, 1);
    this.onEnumRemoved.emit(index);
  }

}
