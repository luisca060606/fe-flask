export function PublicLayout(content) {
  return `
    <main class="container mt-5 d-flex justify-content-center align-items-center vh-100">
      ${content}
    </main>
  `;
}