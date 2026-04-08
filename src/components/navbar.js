import { logoutUser } from "../services/api.js";
import { navigateTo } from "../router.js";
import Swal from "sweetalert2";

export function navbarComponent(userEmail = "Usuario") {
  return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a class="navbar-brand" href="#">App Flask Frontend</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link nav-animated {% if request.endpoint == 'authentication.homepage' %}active{% endif %}"
            href="/dashboard" data-link>
            Home Sys
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle nav-animated" href="#" role="button" data-bs-toggle="dropdown">
            Inventory
          </a>
          <ul class="dropdown-menu shadow border-0 rounded-3">
            <li><a class="dropdown-item" href="/stores" data-link>Stores</a></li>
            <li><a class="dropdown-item" href="#">Categories</a></li>
            <li><a class="dropdown-item" href="#">Products</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link nav-animated {% if request.endpoint == 'authentication.scrapy_data' %}active{% endif %}"
            href="#">
            Scrapy Data
          </a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle nav-animated" href="#" role="button" data-bs-toggle="dropdown">
            Admin
          </a>
          <ul class="dropdown-menu shadow border-0 rounded-3">
            <li><a class="dropdown-item" href="#">Manage Users</a></li>
          </ul>
        </li>
      </ul>

      <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
              ${userEmail}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Settings</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><button class="dropdown-item text-danger" id="btnNavLogout">Log out</button></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  `;
}

export function setupNavbar() {
  const btnLogout = document.getElementById("btnNavLogout");
  if (!btnLogout) return;

  btnLogout.addEventListener("click", async () => {
    const result = await logoutUser();
    if (result.success) {
      Swal.fire({ icon: "success", title: "bye", timer: 1000, showConfirmButton: false })
        .then(() => navigateTo("/"));
    } else {
      Swal.fire({ icon: "error", title: "Error", text: "The session could not be closed." });
    }
  });
}