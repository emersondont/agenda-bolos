import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "../database/initializeDatabase";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/react-query";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from '@eva-design/eva';

export default function Layout() {
  return (
    <ApplicationProvider {...eva} theme={eva.light} >
      <SQLiteProvider databaseName="cakeSchedule.db" onInit={initializeDatabase}>
        <QueryClientProvider client={queryClient}>
          <Slot />
        </QueryClientProvider>
      </SQLiteProvider>
    </ApplicationProvider>
  )
}