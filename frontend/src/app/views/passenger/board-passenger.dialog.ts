import {Component, EventEmitter, Inject, OnInit} from "@angular/core";
import {MDC_DIALOG_DATA, MdcDialogRef, MdcSnackbar} from "@angular-mdc/web";
import {DialogData} from "../mothership/list-mothership.component";
import {PassengerService} from "../../services/passengerService";
import {SpaceshipService} from "../../services/spaceshipService";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: './board-passenger.dialog.html'
})
export class PassengerBoardDialog implements OnInit {
  private spaceships: Spaceship[];
  constructor(public dialogRef: MdcDialogRef<PassengerBoardDialog>, @Inject(MDC_DIALOG_DATA) public data: DialogData, private snackbar: MdcSnackbar, private passengerService: PassengerService, private spaceshipService: SpaceshipService) { }

  message = '';
  action = 'OK';
  multiline = false;
  dismissOnAction = true;
  align = 'center';
  focusAction = false;
  actionOnBottom = false;
  onBoard = new EventEmitter();

  passengerBoardForm = new FormGroup({
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
    if (this.passengerBoardForm.valid) {
      let passengerId = this.passengerBoardForm.value.passengerId;
      let spaceshipId = this.passengerBoardForm.value.spaceshipId;
      this.passengerService.board(passengerId, spaceshipId).subscribe(
        value => {
          //console.log(value);
          this.message = 'Se ha asignado correctamente';
          this.showSnackbar();
          this.onBoard.emit();
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
