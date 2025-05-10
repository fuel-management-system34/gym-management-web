export interface ToolbarButton {
  title: string;
  icon: string;
  callback: () => void;
  isDisabled?: boolean;
  loadingKey?: string;
}
