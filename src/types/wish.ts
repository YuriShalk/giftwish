export interface WishItem {
  id: string;
  name: string;
  price: number;
  size?: string; // string for clothes or number for shoes?
  url?: string;
}

export interface Category {
  id: string;
  title: string;
  items: WishItem[];
}
