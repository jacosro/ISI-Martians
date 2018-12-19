import { Component, EventEmitter, Inject } from "@angular/core";
import { MDC_DIALOG_DATA, MdcDialogRef, MdcSnackbar } from "@angular-mdc/web";
import { PassengerService } from "../../services/passengerService";
import { SpaceshipService } from "../../services/spaceshipService";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DialogData } from "../../entities/dialogData";

@Component({
  templateUrl: './land-passenger.dialog.html'
})
export class PassengerLandDialog {
  private spaceships: Spaceship[];
  constructor(public dialogRef: MdcDialogRef<PassengerLandDialog>, @Inject(MDC_DIALOG_DATA) public data: DialogData, private snackbar: MdcSnackbar, private passengerService: PassengerService, private spaceshipService: SpaceshipService) { }

  message = '';
  action = 'OK';
  multiline = false;
  dismissOnAction = true;
  align = 'center';
  focusAction = false;
  actionOnBottom = false;
  onLand = new EventEmitter();

  passengerLandForm = new FormGroup({
    spaceshipId: new FormControl('', Validators.required),
    passengerId: new FormControl('', Validators.required)
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

  loadSpaceships() {
    this.spaceshipService.getAll()
      .subscribe(spaceships => {
        this.spaceships = spaceships;
      }, error => {
        console.log(error);
      });
  }

  submit(): void {
    if (this.passengerLandForm.valid) {
      let passengerId = this.passengerLandForm.value.passengerId;
      let spaceshipId = this.passengerLandForm.value.spaceshipId;
      this.passengerService.land(passengerId, spaceshipId).subscribe(
        value => {
          //console.log(value);
          this.message = 'Se ha bajado correctamente';
          this.showSnackbar();
          this.onLand.emit();
        }, error => {
          console.log(error);
          this.message = error;
          this.showSnackbar();
        }
      );
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {
    this.loadSpaceships()
  }
}
