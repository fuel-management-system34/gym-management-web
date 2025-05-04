import { Component, ElementRef, Inject, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-add-edit-workout-plans',
  templateUrl: './add-edit-workout-plans.component.html',
  styleUrls: ['./add-edit-workout-plans.component.css'],
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule
  ]
})
export class AddEditWorkoutPlansComponent {
  workoutForm: FormGroup;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditWorkoutPlansComponent>,
    private cdr: ChangeDetectorRef
  ) {
    this.workoutForm = this.fb.group({
      workoutPlan: ['', Validators.required],
      noOfDays: [0, Validators.required],
      routine: this.fb.array([])
    });

    this.addRoutine(); // Add one default row
  }

  get routineArray() {
    return this.workoutForm.get('routine') as FormArray;
  }

  addRoutine() {
    const routineGroup = this.fb.group({
      workout: ['', Validators.required],
      sets: [0, Validators.required],
      repetition: [0, Validators.required]
    });

    this.routineArray.push(routineGroup);
    if (this.table) {
      this.table.renderRows();
    }
  }

  deleteRoutine(index: number) {
    this.routineArray.removeAt(index);
    if (this.table) {
      this.table.renderRows();
    }
  }

  save() {
    console.log('Saved Data:', this.workoutForm.value);
  }

  printAsPdf() {
    const element = document.getElementById('pdfTable');
    if (!element) return;

    // html2canvas(element).then((canvas) => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jsPDF();
    //   const imgProps = (pdf as any).getImageProperties(imgData);
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //   pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //   pdf.save('WorkoutPlan.pdf');
    // });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
