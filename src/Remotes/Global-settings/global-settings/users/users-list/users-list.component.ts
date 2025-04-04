import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToolbarButtons } from 'src/Remotes/Components/Models/toolbar-butons.model';
import { ToolBarComponent } from 'src/Remotes/Components/tool-bar/tool-bar.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [MatCardModule, ToolBarComponent, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {
  dashboardName = 'User List';
  toolbarButtons = [
    { label: ToolbarButtons.NEW, action: ToolbarButtons.NEW },
    { label: ToolbarButtons.REFRESH, action: ToolbarButtons.REFRESH }
  ];

  ngOnInit(): void {}

  onToolbarButtonClick(action: ToolbarButtons) {
    switch (action) {
      case ToolbarButtons.NEW:
        this.createNewItem();
        break;
      case ToolbarButtons.REFRESH:
        this.refreshData();
        break;
    }
  }

  createNewItem() {
    console.log('Create new item');
    // Logic to create a new item
  }

  refreshData() {
    console.log('Refresh data');
    // Logic to refresh data
  }
}
