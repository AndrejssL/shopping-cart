export interface ShopItem {
  name: string;
  price: number;
  img: string;
  description: string;
  quantity: any;
  id: string;
  stock: number;
}

export type ShopItemProps = ShopItem & {
    quantity: string;
    
}