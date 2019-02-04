import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { CliCreateComponent } from './cli/create/create.component';
import { CliService, CommandResult } from './cli/cli.service';
import { Subject } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { CliGenerateComponent } from './cli/generate/generate.component';
import { TerminalData } from './_shared/terminal/terminal.service';

@Component({
  selector: 'app-snack-bar-error',
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      span {
        color: #f44336;
        font-family: Roboto, 'Helvetica Neue', sans-serif;
      }
      mat-icon {
        color: #f44336;
      }
    `
  ],
  template:
    '<mat-icon>error</mat-icon><span>An error has occured. Check the logs tab.</span>'
})
export class SnackBarErrorComponent { }

@Component({
  selector: 'app-snack-bar-success',
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
      span {
        color: #81c784;
        font-family: Roboto, 'Helvetica Neue', sans-serif;
      }
      mat-icon {
        color: #4caf50;
      }
    `
  ],
  template:
    '<mat-icon>verified_user</mat-icon><span>Command executed successfully.</span>'
})
export class SnackBarSuccessComponent { }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedIndex = 0;

  // Enable/Disable generate tab
  klingon = { generate: false };

  @ViewChild('appCli') appCli: CliCreateComponent;
  @ViewChild('appGenerate') appGenerate: CliGenerateComponent;

  constructor(
    public snackBarError: MatSnackBar,
    public snackBarSuccess: MatSnackBar,
    private cliService: CliService
  ) { }

  ngOnInit() {
    this.selectedIndex = parseInt(
      localStorage.getItem('ui.selectedIndex') || '0',
      10
    );
    localStorage.setItem('ui.selectedIndex', `${this.selectedIndex}`);

    this.subscribeToNgCreate();
  }

  subscribeToNgCreate() {
    this.cliService.onNgCreate.asObservable()
      .pipe(flatMap((data: Subject<CommandResult>) => data))
      .subscribe((response: any) => {
        /**
        * exit event of ng command returns exit code (0/1). So if it returns 0, means ng command executed successfully. Only then
        * we enable generate tab.
        */
        if (response.exit === 0) {
          this.selectedIndex = 1;
          this.klingon.generate = true;
        }
      });
  }

  onNgCreateEvent(response: any) {
  }

  storeIndex(index: number) {
    // Set app-name from localStorage if generate tab is selected.
    if (index === 1) {
      this.appGenerate.form.patchValue({ 'app-name': localStorage.getItem('ui.appName') });
    }
    localStorage.setItem('ui.selectedIndex', `${index}`);
  }

  onError(message) {
    console.log('onError::', message);
    this.snackBarError.openFromComponent(SnackBarErrorComponent, {
      duration: 3000,
      panelClass: ['error-container']
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


  onDrag(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.appCli.import(event);
  }

  onTerminalOpen(data: TerminalData) {
    /**
     * Set current directory from server if root directory field is empty
     */
    if(data.cwd && !this.appCli.form.value['root-dir']) {
      this.appCli.form.patchValue({'root-dir': data.cwd});
    }
  }
}
