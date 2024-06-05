import { z } from "zod";

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

export const cakeSchema = z.object({
  // id: z.string(),
  customer: z.string().min(1),
  price: z.coerce.number().min(0.01),
  deliveryDate: z.coerce.date(),
  deliveryHour: z.string().min(1),
  fillings: z.string().min(1),
  batter: z.string().min(1),
  // quantityFillings: z.coerce.number(),
  quantityBatters: z.coerce.number(),
  description: z.string().optional(),
})
export type CakeSchema = z.infer<typeof cakeSchema>
