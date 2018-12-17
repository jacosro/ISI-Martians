import { Component, EventEmitter, Inject, OnInit } from "@angular/core";
import { MDC_DIALOG_DATA, MdcDialogRef, MdcSnackbar } from "@angular-mdc/web";
import { DialogData } from "../../entities/dialogData";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {InspectionService} from "../../services/inspectionService";
import {SpaceshipService} from "../../services/spaceshipService";

@Component({
  templateUrl: './inspection-spaceship.dialog.html'
})
export class SpaceshipInspectionDialog implements OnInit {
  constructor(public dialogRef: MdcDialogRef<SpaceshipInspectionDialog>,
              @Inject(MDC_DIALOG_DATA) public data: DialogData, private snackbar: MdcSnackbar, public inspectionService : InspectionService, public spaceshipService: SpaceshipService) { }

  message = '';
  action = 'OK';
  multiline = false;
  dismissOnAction = true;
  align = 'center';
  focusAction = false;
  actionOnBottom = false;
  motherships: Mothership[] = [

  ];
  onInspection = new EventEmitter();

  spaceshipInspectionForm = new FormGroup({
    id: new FormControl('', Validators.required),
    revisor: new FormControl('', Validators.required),
    spaceship_id: new FormControl('', Validators.required),
    date: new FormControl('', [Validators.required, Validators.min(Date.now())])
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

  async submit() {
    if (this.spaceshipInspectionForm.valid) {

      const passengersIds: Number[] = await this.spaceshipService.getPassengers(this.spaceshipInspectionForm.value.spaceship_id).toPromise();

      var inspection : Inspection = {
        id : this.spaceshipInspectionForm.value.id,
        inspector : this.spaceshipInspectionForm.value.revisor,
        spaceshipId: this.spaceshipInspectionForm.value.spaceship_id,
        date: this.spaceshipInspectionForm.value.date,
        passengersIds: passengersIds
      };

      this.inspectionService.create(inspection).subscribe(
        value => {
          console.log(value);
          this.message = 'Se ha creado correctamente';
          this.showSnackbar();
          this.onInspection.emit();
        }, error => {
          console.log(error);
          this.message = error;
          this.showSnackbar()
        }
      );

      this.dialogRef.close();
    }
  }

  ngOnInit(): void {

  }
}
