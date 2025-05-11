import { ToolbarButton, ToolbarButtonKey } from '../models/toolbar-button.type';

export const ToolbarButtons: Record<ToolbarButtonKey, ToolbarButton> = {
  [ToolbarButtonKey.Refresh]: {
    key: ToolbarButtonKey.Refresh,
    title: 'Refresh',
    icon: 'refresh'
  },
  [ToolbarButtonKey.New]: {
    key: ToolbarButtonKey.New,
    title: 'New',
    icon: 'add'
  },
  [ToolbarButtonKey.Save]: {
    key: ToolbarButtonKey.Save,
    title: 'Save',
    icon: 'save'
  },
  [ToolbarButtonKey.SaveAndClose]: {
    key: ToolbarButtonKey.SaveAndClose,
    title: 'Save & Close',
    icon: 'done_all'
  },
  [ToolbarButtonKey.Edit]: {
    key: ToolbarButtonKey.Edit,
    title: 'Edit',
    icon: 'edit'
  },
  [ToolbarButtonKey.Delete]: {
    key: ToolbarButtonKey.Delete,
    title: 'Delete',
    icon: 'delete'
  },
  [ToolbarButtonKey.Upload]: {
    key: ToolbarButtonKey.Upload,
    title: 'Upload',
    icon: 'upload_file'
  },
  [ToolbarButtonKey.Download]: {
    key: ToolbarButtonKey.Download,
    title: 'Download',
    icon: 'download'
  },
  [ToolbarButtonKey.Export]: {
    key: ToolbarButtonKey.Export,
    title: 'Export',
    icon: 'file_download'
  },
  [ToolbarButtonKey.Import]: {
    key: ToolbarButtonKey.Import,
    title: 'Import',
    icon: 'file_upload'
  },
  [ToolbarButtonKey.Print]: {
    key: ToolbarButtonKey.Print,
    title: 'Print',
    icon: 'print'
  },
  [ToolbarButtonKey.Back]: {
    key: ToolbarButtonKey.Back,
    title: 'Back',
    icon: 'arrow_back'
  },
  [ToolbarButtonKey.Next]: {
    key: ToolbarButtonKey.Next,
    title: 'Next',
    icon: 'arrow_forward'
  },
  [ToolbarButtonKey.Cancel]: {
    key: ToolbarButtonKey.Cancel,
    title: 'Cancel',
    icon: 'cancel'
  },
  [ToolbarButtonKey.Submit]: {
    key: ToolbarButtonKey.Submit,
    title: 'Submit',
    icon: 'send'
  }
};
