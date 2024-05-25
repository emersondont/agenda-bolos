export type FillingType = {
  id: string;
  name: string;
};

export type CakeType = {
  id: string;
  customer: string;
  price: number;
  deliveryDate: Date;
  deliveryHour: string; // morning, afternoon, night
  fillings: string; // filling 1;filling 2;filling 3
  batter: string;
  quantityFillings: number;
  quantityBatters: number;
  description: string;
};
