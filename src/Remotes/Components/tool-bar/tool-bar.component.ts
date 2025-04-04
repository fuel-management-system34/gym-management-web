import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarButtons } from '../Models/toolbar-butons.model';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.scss'
})
export class ToolBarComponent {
  @Input() dashboardName!: string;
  @Input() buttons!: { label: string; action: ToolbarButtons }[];

  @Output() buttonClick = new EventEmitter<ToolbarButtons>();

  onButtonClick(action: ToolbarButtons) {
    this.buttonClick.emit(action); // Emit the enum action to the parent
  }
}
