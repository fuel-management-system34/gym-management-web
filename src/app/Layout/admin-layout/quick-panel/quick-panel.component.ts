// quick-panel.component.ts
import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { QuickPanelService } from '../../../Core/services/quick-panel.service';

@Component({
  selector: 'app-quick-panel',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './quick-panel.component.html',
  styleUrls: ['./quick-panel.component.scss']
})
export class QuickPanelComponent {
  constructor(public quickPanelService: QuickPanelService) {}

  closePanel() {
    this.quickPanelService.close();
  }
}
