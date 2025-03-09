// Cart drawer functionality
const initCartDrawer = function () {
  // Elements
  const cartToggle = document.querySelector("[data-cart-toggle]");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");

  if (!cartToggle || !cartDrawer || !cartOverlay) return;

  // Open cart drawer
  cartToggle.addEventListener("click", function (e) {
    e.preventDefault();
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
    document.body.style.overflow = "hidden"; // Prevent scrolling when drawer is open
  });

  // Close cart drawer
  function closeCartDrawer() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  cartOverlay.addEventListener("click", closeCartDrawer);

  // Quantity adjustment and item removal
  const setupCartActions = function () {
    const qtyButtons = document.querySelectorAll(".js-qty-adjust");
    const removeButtons = document.querySelectorAll(".js-remove-item");

    // Update quantity
    qtyButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const id = this.dataset.id;
        const qty = parseInt(this.dataset.qty);

        if (qty >= 0) {
          updateCartItem(id, qty);
        }
      });
    });

    // Remove item
    removeButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const id = this.dataset.id;
        updateCartItem(id, 0);
      });
    });
  };

  setupCartActions();

  // Function to update cart items
  function updateCartItem(id, qty) {
    fetch("/cart/change.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        quantity: qty,
      }),
    })
      .then((response) => response.json())
      .then((cart) => {
        // Refresh the cart drawer content
        // For a better experience, you could use AJAX to update just the cart content
        // instead of reloading the page
        location.reload();
      })
      .catch((error) => {
        console.error("Error updating cart:", error);
      });
  }
};

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  initCartDrawer();
});
