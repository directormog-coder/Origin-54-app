export interface CartItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
  category: string;
  quantity: number;
  artisan_name?: string | null;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}
