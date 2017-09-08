import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-snack-bar-error',
  styles: [`
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    span { 
      color: #F44336;
      font-family: Roboto,"Helvetica Neue",sans-serif;
    } 
    md-icon {
      color: #F44336;
    }
  `],
  template: '<md-icon>error</md-icon><span>An error has occured. Check the logs tab.</span>'
})
export class SnackBarErrorComponent {}

@Component({
  selector: 'app-snack-bar-success',
  styles: [`
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    span { 
      color: #81C784;
      font-family: Roboto,"Helvetica Neue",sans-serif;
    } 
    md-icon {
      color: #4CAF50;
    }
  `],
  template: '<md-icon>verified_user</md-icon><span>Command executed successfully.</span>'
})
export class SnackBarSuccessComponent {}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedIndex: number = 0;

  constructor(
    public snackBarError: MdSnackBar,
    public snackBarSuccess: MdSnackBar) {
  }

  ngOnInit(){
    this.selectedIndex = parseInt(localStorage.getItem('ui.selectedIndex') || '0', 10);
    localStorage.setItem('ui.selectedIndex', `${this.selectedIndex}`);
  }

  storeIndex(index: number) {
    localStorage.setItem('ui.selectedIndex', `${index}`);
  }

  onError(message) {
    console.log('onError::', message);
    this.snackBarError.openFromComponent(SnackBarErrorComponent, {
      duration: 3000,
      extraClasses: ['error-container']
    });
  }

  onSuccess(message) {
    console.log('onSuccess::', message);
    if (message) {
      this.snackBarSuccess.openFromComponent(SnackBarSuccessComponent, {
        duration: 2000
      });
    }
  }
}
