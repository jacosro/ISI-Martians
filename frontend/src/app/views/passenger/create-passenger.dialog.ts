import { Component, EventEmitter, Inject } from "@angular/core";
import { MDC_DIALOG_DATA, MdcDialogRef, MdcSnackbar } from "@angular-mdc/web";
import { PassengerService } from "../../services/passengerService";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DialogData } from "../../entities/dialogData";

@Component({
  templateUrl: './create-passenger.dialog.html'
})
export class PassengerCreateDialog {
  constructor(public dialogRef: MdcDialogRef<PassengerCreateDialog>,
              @Inject(MDC_DIALOG_DATA) public data: DialogData, private snackbar: MdcSnackbar, private passengerService: PassengerService) { }

  message = '';
  action = 'OK';
  multiline = false;
  dismissOnAction = true;
  align = 'center';
  focusAction = false;
  actionOnBottom = false;
  onCreate = new EventEmitter();

  passengerForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
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
    if (this.passengerForm.valid) {
      let passenger = {name: this.passengerForm.value.name, id: this.passengerForm.value.id};
      this.passengerService.create(passenger).subscribe(
        value => {
          this.message = 'Se ha creado correctamente';
          this.showSnackbar();
          this.onCreate.emit();
        }, error => {
          console.log(error);
          this.message = error;
          this.showSnackbar()
        }
      );
      this.dialogRef.close();
    }
  }
}
