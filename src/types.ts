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
  icing: string; //Merengue, chantilly ou nata
  description?: string;
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
  icing: z.string().min(1),
  description: z.string().optional(),
})
export type CakeSchema = z.infer<typeof cakeSchema>

export type ExpenseType = {
  id: string;
  product: string;
  quantity: string;
  price: number;
  paymentDate: Date;
}

export const expenseSchema = z.object({
  product: z.string().min(1),
  quantity: z.string().min(1),
  price: z.coerce.number().min(0.01),
  paymentDate: z.coerce.date()
})
export type ExpenseSchema = z.infer<typeof expenseSchema>
