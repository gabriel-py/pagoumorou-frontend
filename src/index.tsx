import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./App";

Sentry.init({
  // dsn: "https://aab52514fed74dee8a5574a9e4c85d23@sentry.amopromo.com/40",
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,
  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: 1.0,
});

const root = createRoot(document.getElementById("root")!);

root.render(<App />);
