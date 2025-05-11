export enum ToolbarButtonKey {
  Refresh = 'Refresh',
  New = 'New',
  Save = 'Save',
  SaveAndClose = 'SaveAndClose'
}

export interface ToolbarButton {
  key: ToolbarButtonKey;
  title?: string;
  icon: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const ActionButtons: ToolbarButton[] = [];
