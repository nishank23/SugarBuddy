import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { LogPage } from "./components/LogPage";
import { HistoryPage } from "./components/HistoryPage";
import { InsightsPage } from "./components/InsightsPage";
import { OnboardingFlow } from "./components/OnboardingFlow";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: OnboardingFlow,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "log", Component: LogPage },
      { path: "history", Component: HistoryPage },
      { path: "insights", Component: InsightsPage },
    ],
  },
]);