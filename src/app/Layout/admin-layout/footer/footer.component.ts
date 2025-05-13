import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { readFileSync } from 'fs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule]
})
export class FooterComponent {
  packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
  version = this.packageJson.version;
}
