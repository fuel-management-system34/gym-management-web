import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SkeletonLoaderComponent {
  @Input() appearance: 'line' | 'circle' | 'rectangle' = 'line';
  @Input() width: string = '100%';
  @Input() height: string = '1.2rem';
  @Input() borderRadius: string = '4px';
  @Input() animation: 'pulse' | 'wave' | 'none' = 'wave';
}
