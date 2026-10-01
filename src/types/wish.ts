export interface WishItem {
  id: string;
  name: string;
  price: number;
  size?: string; // 'M', '42'
  url?: string;
  notes?: string;
}

export interface Category {
  id: string;
  title: string;
  items: WishItem[];
}
