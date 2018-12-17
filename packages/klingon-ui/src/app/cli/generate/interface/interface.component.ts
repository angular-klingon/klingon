import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.css']
})
export class InterfaceComponent {

  @Input()
  public form: FormGroup;

  @Input()
  public index: number;

  @Output()
  onInterfaceAdded: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Output()
  onInterfaceRemoved: EventEmitter<any> = new EventEmitter<any>();

  formControls: FormControl[];

  static buildInterfaceForm() {
    return new FormGroup({
      'interface-name': new FormControl('', Validators.required),
      'interface-type': new FormControl(''),
      'prefix': new FormControl(''),
      'project': new FormControl(''),
      'lint-fix': new FormControl(false)
    });
  }
  
  addNewInterface(event) {
    const formGroup = InterfaceComponent.buildInterfaceForm();
    this.form.controls.interfaces['controls'].push(formGroup);
    this.onInterfaceAdded.emit(formGroup);
  }

  removeInterface(index) {
    this.form.controls.interfaces['controls'].splice(index, 1);
    this.onInterfaceRemoved.emit(index);
  }

}
