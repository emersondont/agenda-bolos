import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "../database/initializeDatabase";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/react-query";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="cakeSchedule.db" onInit={initializeDatabase}>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </SQLiteProvider>
  )
}