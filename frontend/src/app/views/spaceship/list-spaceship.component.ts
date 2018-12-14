import {Component, EventEmitter, Inject, NgModule, OnInit, ViewChild} from '@angular/core';
import {MDC_DIALOG_DATA, MdcDialog, MdcDialogRef, MdcSnackbar} from '@angular-mdc/web';
import {FormControl, FormGroup, Validators, NgForm} from '@angular/forms';
import {DialogData} from '../mothership/list-mothership.component';
import {SpaceshipService} from "../../services/spaceshipService";
import {MothershipService} from "../../services/mothershipService";
import {MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-list-spaceship',
  templateUrl: './list-spaceship.component.html',
  styleUrls: ['./list-spaceship.component.scss']
})
export class ListSpaceshipComponent implements OnInit {
  escapeToClose = true;
  clickOutsideToClose = true;

  @ViewChild(MatSort) sort: MatSort;

  columnsToDisplay = ['id', 'name', 'maxPassengers', 'fromMothership_id', 'toMothership_id', 'revision'];
  myData: Spaceship[] = [

  ];
  private dataSource: MatTableDataSource<Spaceship>;
  
  constructor(public dialog: MdcDialog, private spaceshipService: SpaceshipService) { }

  ngOnInit() {
    this.loadSpaceships()
  }

  loadSpaceships() {
    this.spaceshipService.getAll()
      .subscribe(spaceships => {
        this.myData = spaceships;
        this.dataSource = new MatTableDataSource(this.myData);
        this.dataSource.sort = this.sort;
      }, error => {
        console.log(error);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openForm() {
    const dialogRef = this.dialog.open(SpaceshipCreateDialog, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      scrollable: true
    });
    dialogRef.componentInstance.onCreate.subscribe(() => {
      this.refresh();
    });
  }

  openRevisionForm() {
    const dialogRef = this.dialog.open(SpaceshipCreateDialog, {
      escapeToClose: this.escapeToClose,
      clickOutsideToClose: this.clickOutsideToClose,
      scrollable: true
    });
    dialogRef.componentInstance.onCreate.subscribe(() => {
      this.refresh();
    });
  }

  refresh(){
    this.spaceshipService.getAll().subscribe(spaceships => {
      this.dataSource.data = spaceships;
    }, error => {
      console.log(error);
    });
  }
}

/*
  Spaceship Revision Dialog
*/
@Component({
  templateUrl: './create-spaceship.dialog.html'
})
export class SpaceshipRevisionDialog implements OnInit {
  constructor(public dialogRef: MdcDialogRef<SpaceshipRevisionDialog>,
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

  spaceshipRevisionForm = new FormGroup({
    id: new FormControl('', Validators.required),
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
    if (this.spaceshipRevisionForm.valid) {

    }
  }

  ngOnInit(): void {
    this.loadMotherships()
  }
}

@Component({
  templateUrl: './revision-spaceship.dialog.html'
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
        }
      );
      this.dialogRef.close();
    }
  }

  ngOnInit(): void {
    this.loadMotherships()
  }
}
