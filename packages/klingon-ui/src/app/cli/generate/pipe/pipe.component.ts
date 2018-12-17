import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.css']
})
export class PipeComponent {

  @Input()
  public form: FormGroup;

  @Input()
  public index: number;

  @Output()
  onPipeAdded: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  @Output()
  onPipeRemoved: EventEmitter<any> = new EventEmitter<any>();

  formControls: FormControl[];

  static buildPipeForm() {
    return new FormGroup({
      'pipe-name': new FormControl('', Validators.required),
      'module': new FormControl(''),
      'project': new FormControl(''),
      'routing-scope': new FormControl(''),
      'export': new FormControl(false),
      'flat': new FormControl(true),
      'lint-fix': new FormControl(false),
      'skip-import': new FormControl(false),
      'spec': new FormControl(true)
    });
  }

  addNewPipe(event) {
    const formGroup = PipeComponent.buildPipeForm();
    this.form.controls.pipes['controls'].push(formGroup);
    this.onPipeAdded.emit(formGroup);
  }

  removePipe(index) {
    this.form.controls.pipes['controls'].splice(index, 1);
    this.onPipeRemoved.emit(index);
  }

}
