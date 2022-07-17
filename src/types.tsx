export interface Modal {
    state: boolean;
    toggleStateHandler: () => void;
    children?: JSX.Element | JSX.Element[] | null;
    icon?: JSX.Element | JSX.Element[] | null;
    title?: string;
  }