import { setupNavbar } from "../components/navbar.js";
import { getAllStores } from "../services/api.js";

export function storesView() {
  return `
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="container py-5">
            <div class="card shadow-lg rounded-4 p-4 border-0">
                <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                    <div>
                        <h3 class="fw-bold mb-1">Manage Stores</h3>
                        <p class="text-muted small">See and manage inventary of system.</p>
                    </div>
                    <div class="d-flex gap-2 mt-2 mt-md-0">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#createStoreModal">
                            <i class="bi bi-plus-circle"></i> New Store
                        </button>
                        <a href="/dashboard" data-link"
                            class="btn btn-outline-secondary d-flex align-items-center gap-2 shadow-sm">
                            <i class="bi bi-arrow-left"></i>
                            Back to Home
                        </a>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-hover align-middle">
                        <thead class="table-light">
                            <tr>
                                <th class="ps-3">Nro</th>
                                <th>Store Name</th>
                                <th>Address</th>
                                <th class="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="stores-container">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
      </div>
  `;
}

function renderStores(stores) {
  const container = document.getElementById("stores-container");

  container.innerHTML = stores.map(store => `
    <tr>
      <td class="ps-3 text-muted">${store.id}</td>
      <td>
          <span class="fw-semibold text-dark">${store.store_name}</span>
      </td>
      <td>
          <span class="badge bg-light text-dark border">${store.address}</span>
      </td>
      <td class="text-center">
          <div class="btn-group shadow-sm" role="group">
              <button type="button" class="btn btn-outline-primary btn-sm" title="Edit" onclick="prepareEditModal(
                  '{{ store.id }}', 
                  '{{ store.store_name }}',
                  '{{ store.address }}'
              )">
                  <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger"
                  onclick="openDeleteModal('{{ store.id }}', '{{ store.store_name }}')"
                  title="Delete Store">
                  <i class="bi bi-trash"></i>
              </button>
          </div>
      </td>
    </tr>
  `).join("");
}

export async function setupStores() {
  setupNavbar();
  console.log("Stores view initialized");
  try {
    const stores = await getAllStores();
    renderStores(stores.stores_list);
  } catch (error) {
    console.error("Error loading stores", error);
  }
}