import Swal from "sweetalert2";


export function createLoginRegisterView() {
  return `
    <div class="card-custom shadow-lg">
      <div class="left-panel">
        <h2 class="mb-4" id="left-title">Hello, Welcome!</h2>
        <p id="left-subtitle">Don't have an account?</p>
        <button id="toggle-btn" class="btn btn-outline-light mt-3" type="button">Register</button>
      </div>

      <div class="right-panel">
        <form id="form-login" autocomplete="off" novalidate>
          <h3 id="form-title">Login</h3>

          <div class="mb-3 input-icon field">
            <svg viewBox="0 0 24 24">
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <input type="email" id="email" required />
            <label for="email">Email</label>
          </div>

          <div class="mb-3 input-icon field">
            <svg viewBox="0 0 24 24">
              <path d="M12 17a2 2 0 0 0 2-2v-2a2 2 0 0 0-4 0v2a2 2 0 0 0 2 2zm6-7v-2a6 6 0 0 0-12 0v2H4v12h16V10h-2zm-6-6a4 4 0 0 1 4 4v2H8v-2a4 4 0 0 1 4-4z"/>
            </svg>
            <input type="password" id="password" required />
            <label for="password">Password</label>
          </div>

          <div class="d-flex justify-content-between align-items-center mb-3">
            <a href="#" id="forgot-password" class="small">Forgot password?</a>
          </div>

          <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>

        <form id="form-register" autocomplete="off" style="display:none;">
          <h3>Registration</h3>

          <div class="mb-3 input-icon field">
            <svg viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79 4-4 4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <input type="text" id="reg-username" required>
            <label for="reg-username">Username</label>
          </div>

          <div class="mb-3 input-icon field">
            <svg viewBox="0 0 24 24">
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM7 10h10v2H7v-2z"/>
            </svg>
            <input type="email" id="reg-email" required>
            <label for="reg-email">Email</label>
          </div>

          <div class="mb-3 input-icon field">
            <svg viewBox="0 0 24 24">
              <path d="M12 17a2 2 0 0 0 2-2v-2a2 2 0 0 0-4 0v2a2 2 0 0 0 2 2zm6-7v-2a6 6 0 0 0-12 0v2H4v12h16V10h-2zm-6-6a4 4 0 0 1 4 4v2H8v-2a4 4 0 0 1 4-4z"/>
            </svg>
            <input type="password" id="reg-password" required>
            <label for="reg-password">Password</label>
          </div>

          <button type="submit" class="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  `;
}

export function setupFormLogic({ onLogin, onRegister }) {
  const toggleBtn = document.getElementById("toggle-btn");
  const leftTitle = document.getElementById("left-title");
  const leftSubtitle = document.getElementById("left-subtitle");
  const formTitle = document.getElementById("form-title");
  const loginForm = document.getElementById("form-login");
  const registerForm = document.getElementById("form-register");

  function showLogin() {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    leftTitle.textContent = "Hello, Welcome!";
    leftSubtitle.textContent = "Don't have an account?";
    toggleBtn.textContent = "Register";
    formTitle.textContent = "Login";
  }

  function showRegister() {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    leftTitle.textContent = "Welcome Back!";
    leftSubtitle.textContent = "Already have an account?";
    toggleBtn.textContent = "Login";
    formTitle.textContent = "Registration";
  }

  toggleBtn.addEventListener("click", () => {
    if (loginForm.style.display === "block") showRegister();
    else showLogin();
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Require all fields",
      });
      return;
    }
    onLogin({ email, password });
  });

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("reg-username").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const pass = document.getElementById("reg-password").value.trim();
    if (!user || !email || !pass) {
      alert("Please fill all fields");
      return;
    }
    // alert("Account created successfully (simulated)");
    onRegister({ user, email, pass });
  });

  showLogin();
}