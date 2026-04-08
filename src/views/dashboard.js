import { navbarComponent, setupNavbar } from "../components/navbar.js";

export function dashboardView() {
  return `
      <div class="row justify-content-center">
        <div class="col-md-12 text-center">
          <div class="card shadow p-5">
            <h1>Welcome</h1>
            <p class="lead">You are securely logged into your dashboard.</p>
            <hr>
            <p class="text-muted">This content is protected by HttpOnly Cookies.</p>
          </div>
        </div>
      </div>
  `;
}

export function setupDashboard() {
  setupNavbar();
  console.log("Dashboard view initialized");
}