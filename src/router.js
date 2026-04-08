import { createLoginRegisterView, setupFormLogic } from "./views/login.js";
import { dashboardView, setupDashboard } from "./views/dashboard.js";
import { storesView, setupStores } from "./views/stores.js";
import { loginUser, registerUser, checkAuth } from "./services/api.js";
import { PublicLayout } from "./layouts/publicLayout.js";
import { PrivateLayout } from "./layouts/privateLayout.js";

import Swal from "sweetalert2";

const routes = {
  "/": {
    view: createLoginRegisterView,
    controller: setupLoginController,
    protected: false,
  },

  "/dashboard": {
    view: dashboardView,
    controller: setupDashboard,
    protected: true,
  },
  "/stores": {
    view: storesView,
    controller: setupStores,
    protected: true,
  },
};

function setupLoginController() {
  setupFormLogic({
    onLogin: async ({ email, password }) => {
      try {
        const result = await loginUser({ email, password });
        if (result.errors) {
          Swal.fire("Invalid data", "Check the fields", "warning");
          return;
        }

        if (!result.success) {
          Swal.fire("Access denied", result.message || "Incorrect credentials", "error");
          return;
        }

        Swal.fire({
          icon: "success",
          title: "Welcome",
          timer: 1200,
          showConfirmButton: false,
        }).then(() => {
          localStorage.setItem('user_email', result.user['email'])
          navigateTo("/dashboard");
        });

      } catch {
        Swal.fire("Network error", "Unable to connect", "error");
      }
    },

    onRegister: async ({ user, email, pass }) => {
      try {
        const result = await registerUser({
          username: user,
          email,
          password: pass,
        });

        if (result.success) {
          Swal.fire("Success", "Account created", "success");
        } else {
          Swal.fire("Error", "Failed to register", "error");
        }

      } catch {
        Swal.fire("Error", "Server error", "error");
      }
    }
  });
}

document.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigateTo(e.target.href);
  }
});

export function navigateTo(path) {
  window.history.pushState({}, "", path);
  renderRoute();
}

export async function renderRoute() {
  const path = window.location.pathname;
  const route = routes[path] || routes["/"];

  const app = document.querySelector("#app");

  let isAuthenticated = false;
  let userEmail = localStorage.getItem("user_email");

  if (route.protected) {
    try {
      const auth = await checkAuth();

      if (!auth.authenticated) {
        navigateTo("/");
        return;
      }

      isAuthenticated = true;

    } catch {
      navigateTo("/");
      return;
    }
  }

  const content = route.view();

  if (route.protected && isAuthenticated) {
    app.innerHTML = PrivateLayout(content, userEmail);
  } else {
    app.innerHTML = PublicLayout(content);
  }

  if (route.controller) {
    route.controller();
  }
}