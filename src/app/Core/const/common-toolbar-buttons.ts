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
  }
};
