import { navbarComponent } from "../components/navbar.js";

export function PrivateLayout(content, userEmail) {
  return `
    <header class="container-fluid px-0">
      ${navbarComponent(userEmail)}
    </header>

    <main class="container-fluid px-0 mt-2">
      ${content}
    </main>

    <footer class="text-center mt-5">
      <p>© 2026</p>
    </footer>
  `;
}