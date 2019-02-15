import { NgModule } from '@angular/core';
import {
  MatToolbarModule, MatIconModule, MatIcon, MatMenuModule, MatDividerModule,
  MatFormFieldModule, MatOptionModule, MatSelectModule, MatButtonModule, MatCheckboxModule,
  MatInputModule, MatSidenavModule, MatCardModule, MatExpansionModule, MatSnackBarModule,
  MatDialogModule, MAT_DIALOG_DATA, MatTooltipModule, MatTableModule, MatSlideToggle, MatSlideToggleModule
} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
    imports:
        [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
        MatMenuModule, MatFormFieldModule, MatOptionModule, MatSelectModule,
        MatInputModule, MatSidenavModule, MatCardModule, MatExpansionModule,
        MatSnackBarModule, MatDialogModule, MatDividerModule, MatTooltipModule,
        MatTableModule, MatSlideToggleModule],
    exports:
        [CdkTableModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
        MatMenuModule, MatFormFieldModule, MatOptionModule, MatSelectModule,
        MatInputModule, MatSidenavModule, MatCardModule, MatExpansionModule,
        MatSnackBarModule, MatDialogModule, MatDividerModule, MatTooltipModule,
        MatTableModule, MatSlideToggleModule]
})
export class MaterialModule { }
