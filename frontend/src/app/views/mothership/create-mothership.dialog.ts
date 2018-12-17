import { Component, EventEmitter, Inject } from "@angular/core";
import { MDC_DIALOG_DATA, MdcDialogRef, MdcSnackbar } from "@angular-mdc/web";
import { MothershipService } from "../../services/mothershipService";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DialogData } from "../../entities/dialogData";

@Component({
  templateUrl: './create-mothership.dialog.html'
})
export class MothershipCreateDialog {
  constructor(public dialogRef: MdcDialogRef<MothershipCreateDialog>,
              @Inject(MDC_DIALOG_DATA) public data: DialogData, private snackbar: MdcSnackbar, public mothershipService: MothershipService) { }

  message = '';
  action = 'OK';
  multiline = false;
  dismissOnAction = true;
  align = 'center';
  focusAction = false;
  actionOnBottom = false;
  onCreate = new EventEmitter();

  mothershipForm = new FormGroup({
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
    if (this.mothershipForm.valid) {
      let mothership = {id: this.mothershipForm.value.id, name: this.mothershipForm.value.name};
      this.mothershipService.create(mothership).subscribe(
        value => {
          console.log(value);
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
