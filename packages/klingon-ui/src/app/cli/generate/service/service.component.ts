import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {

  @Input()
  public form: FormGroup;

  @Input()
  public index: number;

  @Output()
  onServiceAdded: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Output()
  onServiceRemoved: EventEmitter<any> = new EventEmitter<any>();

  formControls: FormControl[];

  static buildServiceForm() {
    return new FormGroup({
      'service-name': new FormControl('', Validators.required),
      'project': new FormControl(''),
      'flat': new FormControl(true),
      'lint-fix': new FormControl(false),
      'spec': new FormControl(true)
    });
  }

  addNewService(event) {
    const formGroup = ServiceComponent.buildServiceForm();
    this.form.controls.services['controls'].push(formGroup);
    this.onServiceAdded.emit(formGroup);
  }

  removeService(index) {
    this.form.controls.services['controls'].splice(index, 1);
    this.onServiceRemoved.emit(index);
  }
}
