import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { LogPage } from "./components/LogPage";
import { HistoryPage } from "./components/HistoryPage";
import { InsightsPage } from "./components/InsightsPage";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { SettingsPage } from "./components/SettingsPage";
import { ChangeBuddyPage } from "./components/ChangeBuddyPage";

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
  {
    path: "/app/settings",
    Component: SettingsPage,
  },
  {
    path: "/app/change-buddy",
    Component: ChangeBuddyPage,
  },
]);
