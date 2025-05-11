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
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

//(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
(pdfMake as any).vfs = (pdfFonts as any).pdfMake.vfs;

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

  onCancel(): void {
    this.dialogRef.close(false);
  }

  generateWorkoutPDF() {
    const formData = this.workoutForm.value;
    const today = new Date().toLocaleDateString();

    const tableBody: any[] = [
      [
        { text: 'No.', style: 'tableHeader' },
        { text: 'Workout', style: 'tableHeader' },
        { text: 'Sets', style: 'tableHeader' },
        { text: 'Repetitions', style: 'tableHeader' }
      ]
    ];

    formData.routine.forEach((item: any, index: number) => {
      tableBody.push([index + 1, item.workout, item.sets, item.repetition]);
    });

    const documentDefinition: any = {
      header: {
        margin: [40, 20, 40, 10],
        columns: [
          // {
          //   image: this.getBase64ImageFromURL('assets/images/gym-logo.png'),
          //   width: 50
          // },
          {
            text: 'Paradise GYM',
            style: 'headerTitle',
            alignment: 'left',
            margin: [10, 10, 0, 0]
          },
          {
            text: `Date: ${today}`,
            alignment: 'right',
            fontSize: 10,
            margin: [0, 10, 0, 0]
          }
        ]
      },
      footer: function (currentPage: number, pageCount: number) {
        return {
          columns: [
            {
              text: 'Paradise GYM - Fitness First',
              alignment: 'left',
              margin: [40, 0, 0, 0],
              fontSize: 9,
              color: '#888'
            },
            {
              text: `Page ${currentPage} of ${pageCount}`,
              alignment: 'right',
              margin: [0, 0, 40, 0],
              fontSize: 9,
              color: '#888'
            }
          ]
        };
      },
      content: [
        {
          text: `Workout Plan: ${formData.workoutPlan}`,
          style: 'subheader'
        },
        {
          text: `Number of Days: ${formData.noOfDays}`,
          style: 'subheader'
        },
        {
          text: 'Workout Routine',
          style: 'sectionHeader'
        },
        {
          style: 'tableStyle',
          table: {
            widths: ['auto', '*', 'auto', 'auto'],
            body: tableBody
          },
          layout: {
            fillColor: function (rowIndex: number) {
              return rowIndex === 0 ? '#CCCCCC' : null;
            }
          }
        }
      ],
      styles: {
        headerTitle: {
          fontSize: 20,
          bold: true
        },
        subheader: {
          fontSize: 12,
          margin: [0, 5, 0, 5]
        },
        sectionHeader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 10]
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'black'
        },
        tableStyle: {
          margin: [0, 5, 0, 15]
        }
      },
      pageMargins: [40, 80, 40, 60]
    };

    (pdfMake as any).createPdf(documentDefinition).open();
  }

  getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.onload = () => {
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        let ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        let dataURL = canvas.toDataURL('url');
        resolve(dataURL);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = url;
    });
  }
}
