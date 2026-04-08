import { renderRoute } from "./router.js";

window.addEventListener("load", () => {
  renderRoute();
});

window.addEventListener("popstate", renderRoute);