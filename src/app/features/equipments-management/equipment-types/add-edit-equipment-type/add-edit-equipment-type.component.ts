import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { EquipmentType } from 'src/app/Core/models/EquipmentTypes';
import { EquipmentTypeService } from 'src/app/Services/api/equipment-type.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-add-edit-equipment-type',
  templateUrl: './add-edit-equipment-type.component.html',
  styleUrls: ['./add-edit-equipment-type.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule
  ]
})
export class AddEditEquipmentTypeComponent implements OnInit {
  companyForm!: FormGroup;
  isEditMode = false;
  equipmentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private equipmentTypeService: EquipmentTypeService,
    private dialogRef: MatDialogRef<AddEditEquipmentTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type?: EquipmentType }
  ) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: [1, Validators.required],
      branchId: [1, Validators.required]
    });

    if (this.data?.type?.Id) {
      this.isEditMode = true;
      this.equipmentId = this.data.type.Id;
      this.equipmentTypeService.fetchById(this.equipmentId).subscribe((res) => {
        const equipment = res.data;
        this.companyForm.patchValue({
          name: equipment.Name,
          description: equipment.Description,
          status: equipment.Status,
          branchId: equipment.BranchId
        });
      });
    }
  }

  onSubmit(): void {
    const formData = this.companyForm.value;

    if (this.isEditMode && this.equipmentId !== null) {
      this.equipmentTypeService
        .updateEquipmentType(this.equipmentId, {
          ...formData,
          modified_by: 1
        })
        .subscribe(() => this.dialogRef.close(true));
    } else {
      this.equipmentTypeService.addEquipmentType(formData).subscribe(() => this.dialogRef.close(true));
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
