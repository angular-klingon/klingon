import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-serviceworker',
  templateUrl: './serviceworker.component.html',
  styleUrls: ['./serviceworker.component.css']
})
export class ServiceworkerComponent {
  
  @Input()
  public form: FormGroup;

  @Input()
  public index: number;

  @Output()
  onServiceWorkerAdded: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Output()
  onServiceWorkerRemoved: EventEmitter<any> = new EventEmitter<any>();

  formControls: FormControl[];

  static buildServiceWorkerForm() {
    return new FormGroup({
      'project': new FormControl(''),
    });
  }

  addNewServiceWorker(event) {
    const formGroup = ServiceworkerComponent.buildServiceWorkerForm();
    this.form.controls.serviceworkers['controls'].push(formGroup);
    this.onServiceWorkerAdded.emit(formGroup);
  }

  removeServiceWorker(index) {
    this.form.controls.serviceworkers['controls'].splice(index, 1);
    this.onServiceWorkerRemoved.emit(index);
  }
}
