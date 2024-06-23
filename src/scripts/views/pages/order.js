document.addEventListener("DOMContentLoaded", async function () {
  try {
    const token = localStorage.getItem("accessToken");
    const checkoutId = localStorage.getItem("checkoutId");

    if (!checkoutId) {
      throw new Error('checkoutId tidak tersedia di localStorage');
    }

    const response = await fetch(`https://farmfresh-backend.vercel.app/api/checkout/${checkoutId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Gagal mengambil data checkout dari server');
    }

    const latestCheckout = await response.json();

    let total = latestCheckout.total.replace("Rp", "").replace(".", "").replace(",", ".").trim();
    total = `Rp${parseFloat(total).toLocaleString('id-ID')}`;

    const orderSummaryElement = document.getElementById("order-summary");

    orderSummaryElement.innerHTML = `
      <div class="order-card">
        <h2>Order Details:</h2>
        <p><span class="label">Name:</span> <span class="value">${latestCheckout.customer.name}</span></p>
        <p><span class="label">Email:</span> <span class="value">${latestCheckout.customer.email}</span></p>
        <p><span class="label">Phone:</span> <span class="value">${latestCheckout.customer.phone}</span></p>
        <p><span class="label">City:</span> <span class="value">${latestCheckout.customer.city}</span></p>
        <p><span class="label">Address:</span> <span class="value">${latestCheckout.customer.address}</span></p>
        <p><span class="label">Postal Code:</span> <span class="value">${latestCheckout.customer.postalCode}</span></p>
        <p><span class="label">Country:</span> <span class="value">${latestCheckout.customer.country}</span></p>
      </div>
      <div class="order-card">
        <h2>Shipping Details:</h2>
        <p><span class="label">Shipping Name:</span> <span class="value">${latestCheckout.shipping.name}</span></p>
        <p><span class="label">Shipping Address:</span> <span class="value">${latestCheckout.shipping.address}</span></p>
        <p><span class="label">Shipping City:</span> <span class="value">${latestCheckout.shipping.city}</span></p>
        <p><span class="label">Shipping Postal Code:</span> <span class="value">${latestCheckout.shipping.postalCode}</span></p>
        <p><span class="label">Shipping Country:</span> <span class="value">${latestCheckout.shipping.country}</span></p>
        <p><span class="label">Shipping Phone:</span> <span class="value">${latestCheckout.shipping.phone}</span></p>
      </div>
      <div class="order-card total">
        <p><span class="label">Total:</span> <span class="value">${total}</span></p>
      </div>
    `;

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm Order";
    confirmButton.classList.add("confirm-button");
    orderSummaryElement.appendChild(confirmButton);

    confirmButton.addEventListener("click", async function () {
      try {
        const deleteCartResponse = await fetch(`https://farmfresh-backend.vercel.app/api/carts`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!deleteCartResponse.ok) {
          throw new Error('Gagal menghapus data cart dari server');
        }

        localStorage.removeItem("checkoutId");

        alert('Order berhasil dibuat');
        window.location.href = "index.html";
      } catch (error) {
        console.error("Terjadi kesalahan saat mengonfirmasi order:", error.message);
      }
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error.message);
  }
});
