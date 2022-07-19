export interface Modal {
    state: boolean;
    toggleStateHandler: () => void;
    children?: JSX.Element | JSX.Element[] | null;
    icon?: JSX.Element | JSX.Element[] | null;
    title?: string;
}

export interface TypeJSX {
  [key : string] : JSX.Element | JSX.Element[] | null
}

export interface Product {
  name: string;
  price: number;
  quantity: number;

}

export interface CartCheckout {
  total: number,
  totalQuantity: number,
  products: [],
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