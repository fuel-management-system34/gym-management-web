export enum ToolbarButtonKey {
  Refresh = 'Refresh',
  New = 'New',
  Save = 'Save',
  SaveAndClose = 'SaveAndClose',
  Upload = 'Upload',
  Download = 'Download',
  Export = 'Export',
  Delete = 'Delete',
  Edit = 'Edit',
  Import = 'Import',
  Print = 'Print',
  Back = 'Back',
  Next = 'Next',
  Cancel = 'Cancel',
  Submit = 'Submit',
}

export interface ToolbarButton {
  key: ToolbarButtonKey;
  title?: string;
  icon: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const ActionButtons: ToolbarButton[] = [];
