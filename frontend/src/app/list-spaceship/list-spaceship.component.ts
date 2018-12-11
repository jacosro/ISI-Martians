import {Component, Inject, NgModule, OnInit} from '@angular/core';
import {MDC_DIALOG_DATA, MdcDialog, MdcDialogRef, MdcSnackbar} from '@angular-mdc/web';
import {FormControl, FormGroup, Validators, NgForm} from '@angular/forms';
import {DialogData} from '../list-mothership/list-mothership.component';
import {SpaceshipService} from "../services/spaceshipService";
import {MothershipService} from "../services/mothershipService";

@Component({
  selector: 'app-list-spaceship',
  templateUrl: './list-spaceship.component.html',
  styleUrls: ['./list-spaceship.component.scss']
})
export class ListSpaceshipComponent implements OnInit {
  escapeToClose = true;
  clickOutsideToClose = true;

  columnsToDisplay = ['id', 'name', 'maxPassengers', 'fromMothership_id', 'toMothership_id'];
  myData: Spaceship[] = [

  ];
  constructor(public dialog: MdcDialog, private spaceshipService: SpaceshipService) { }

  ngOnInit() {
    this.loadSpaceships()
  }

  loadSpaceships() {
    this.spaceshipService.getAll()
      .subscribe(spaceships => {
        this.myData = spaceships;
      }, error => {
        console.log(error);
      });
  }

  openForm() {
    const dialogRef = this.dialog.open(SpaceshipCreateDialog, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      scrollable: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`dialog: ${result}`);
    });
  }

}


@Component({
  templateUrl: './create-spaceship.dialog.html'
})
export class SpaceshipCreateDialog implements OnInit {
  constructor(public dialogRef: MdcDialogRef<SpaceshipCreateDialog>,
              @Inject(MDC_DIALOG_DATA) public data: DialogData, private snackbar: MdcSnackbar, public spaceshipService: SpaceshipService, public mothershipService: MothershipService) { }

  message = '';
  action = 'OK';
  multiline = false;
  dismissOnAction = true;
  align = 'center';
  focusAction = false;
  actionOnBottom = false;
  motherships: Mothership[] = [

  ];

  loadMotherships() {
    this.mothershipService.getAll()
      .subscribe(motherships => {
        this.motherships = motherships;
      }, error => {
        console.log(error);
      });
  }

  spaceshipForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    // name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    maxPassengers: new FormControl('', Validators.required),
    fromMothership: new FormControl('', Validators.required),
    toMothership: new FormControl('', Validators.required)
  });

  showSnackbar() {
    const snackbarRef = this.snackbar.show(this.message, this.action, {
      align: this.align,
      multiline: this.multiline,
      dismissOnAction: this.dismissOnAction,
      focusAction: this.focusAction,
      actionOnBottom: this.actionOnBottom,
    });

    snackbarRef.afterDismiss().subscribe(() => {
      console.log('The snack-bar was dismissed');
    });
  }

  submit(): void {
    if (this.spaceshipForm.valid) {
      let spaceship = {name: this.spaceshipForm.value.name, id: this.spaceshipForm.value.id, maxPassengers: this.spaceshipForm.value.maxPassengers,
        fromMothership_id: this.spaceshipForm.value.fromMothership,
        toMothership_id: this.spaceshipForm.value.toMothership
      };
      this.spaceshipService.create(spaceship).subscribe(
        value => {
          console.log(value);
          this.message = 'Se ha creado correctamente';
          this.showSnackbar();
        }, error => {
          console.log(error);
        }
      );
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {
    this.loadMotherships()
  }
}
