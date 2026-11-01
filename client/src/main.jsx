import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Fonts are bundled with the site (no Google Fonts request).
//   JetBrains Mono = big display headings
//   Inter                     = body text
//   JetBrains Mono            = small labels and tags

import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";

import "./styles/tokens.css";
import "./styles/base.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
