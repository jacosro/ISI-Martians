import { Component, EventEmitter, Inject, OnInit } from "@angular/core";
import { MDC_DIALOG_DATA, MdcDialogRef, MdcSnackbar } from "@angular-mdc/web";
import { DialogData } from "../../entities/dialogData";
import { SpaceshipService } from "../../services/spaceshipService";
import { MothershipService } from "../../services/mothershipService";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
  onCreate = new EventEmitter();

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
          this.onCreate.emit();
        }, error => {
          console.log(error);
          this.message = error;
          this.showSnackbar()
        }
      );
      this.dialogRef.close();
    } else {
      this.validateAllFormFields(this.spaceshipForm);
    }
  }

  ngOnInit(): void {
    this.loadMotherships()
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {

      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
}
