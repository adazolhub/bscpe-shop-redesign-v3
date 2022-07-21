export interface Modal {
  state: boolean;
  toggleStateHandler: () => void;
  children?: JSX.Element | JSX.Element[] | null;
  icon?: JSX.Element | JSX.Element[] | null;
  title?: string;
}

export interface TypeJSX {
  [key: string]: JSX.Element | JSX.Element[] | null;
}

export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export interface CartCheckout {
  total: number;
  totalQuantity: number;
  products: [];
}

export interface ProductCart {
  product_id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
}

export interface ProductList {
  product_id: string;
  product_name: string;
  product_image: string;
  product_quantity: number;
  product_price: number;
  product_size: string[];
  product_color: string[];
}

export interface StaticState {
  /**
   * This is the state that can be called by toggleStateHandler param of modal_type
   */
  toggleState: { [state: string]: boolean };

  toggleStateHandler: (
    modal_type:
      | string
      | "modal"
      | "cart"
      | "notification"
      | "header_notify"
      | "modal_ios"
      | "modal_full"
      | "modal_standard"
      | "side_bar"
      | "hamburger_mobile"
  ) => void;
  selectedProduct: any;
  setSelectedProduct: any;
}

export interface States {
  modalToggle?: any;
  modalToggleHandler?: any;
  toggleListGrid?: any;
  handleToggleListGrid?: any;
  settingToggle?: any;
  settingToggleHandler?: any;
  checkoutToggle?: any;
  checkoutToggleHandler?: any;
  cartToggle?: any;
  cartToggleHandler?: any;
  cartToggleOff?: any;
  notifyToggle?: any;
  notifyToggleHandler?: any;
  notifyToggleOff?: any;
  toggleHeadNotify?: any;
  toggleHeadNotifyHandler?: any;
  category?: any;
}
