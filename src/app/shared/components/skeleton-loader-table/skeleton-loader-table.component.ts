import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

@Component({
  selector: 'app-skeleton-loader-table',
  templateUrl: './skeleton-loader-table.component.html',
  styleUrls: ['./skeleton-loader-table.component.scss'],
  standalone: true,
  imports: [CommonModule, SkeletonLoaderComponent]
})
export class SkeletonLoaderTableComponent {
  @Input() columns: number = 7; // Make sure it's a number, not Array(7)
  @Input() rows: number = 5;
  @Input() showActions: boolean = true;
  @Input() hasHeader: boolean = true;

  get displayedColumns(): number[] {
    const cols = Array.from({ length: this.columns }, (_, i) => i);
    if (this.showActions) {
      cols.push(this.columns); // action column
    }
    return cols;
  }

  get rowsArray(): number[] {
    return Array.from({ length: this.rows }, (_, i) => i);
  }
}
