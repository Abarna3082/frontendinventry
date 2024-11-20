
const getProductById = async () => {
    try {
        const token = localStorage.getItem("token")
        const url = new URL(window.location.href);
        const productId = url.searchParams.get("productId");
        console.log(productId)
        const response = await fetch(`http://localhost:8080/inventry/products/${productId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error("Error while fetching product");
        }
        const data = response.status === 404 ? null : await response.json();
        console.log(data);
        if (data != null) {
            const table = document.getElementById("productTable");
            table.style.display = "table";
            const tableBody = document.querySelector("#productTable tbody");
            tableBody.innerHTML = "";
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="productId">${data.productId}</td>
                <td>${data.productName}</td>
                <td class="quantity">${data.quantity}</td>
                <td>${data.price}</td>
                <td><button class="edit-btn">Edit</button></td>
                 <td><button class="delete-btn">Delete</button>
                 </td>
            `;
            tableBody.appendChild(row);
            document.querySelector(".edit-btn").addEventListener("click", () => openEditModal(data.productId));
            document.querySelector(".delete-btn").addEventListener("click", () => deleteProductById(data.productId));
        }
    } catch (error) {
        alert("Product ID not found");
        console.log(error.message);
    }
};

const openEditModal = (productId) => {
    const modal = document.getElementById("editModal");
    modal.style.display = "block";
    document.getElementById("save-btn").dataset.productId = productId;
    document.querySelector(".close-btn").addEventListener("click", () => {
        modal.style.display = "none";
    });
};

const deleteProductById = async (productId) => {
    const token = localStorage.getItem("token")
    if (!confirm(`Are you sure you want to delete the product with ID ${productId}?`)) {
        return;
    }
    try {
        const response = await fetch(`http://localhost:8080/inventry/deleteByProductId/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            }
        });
        if (!response.ok) {
            throw new Error("Error while deleting product");
        }
        alert("Product deleted successfully");
        document.querySelector("#productTable tbody").innerHTML = "";
        document.getElementById("productTable").style.display = "none";
        window.location.href = "view.html"
    } catch (error) {
        alert("Failed to delete product");
        console.log(error.message);
    }
};

const updateProduct = async () => {
    try {
        const quantity = parseInt(document.getElementById("newQuantity").value);
        const productId = document.getElementById("save-btn").dataset.productId;
        const availableQuantity = parseInt(document.querySelector(".quantity").textContent)
        console.log(availableQuantity)
        console.log(availableQuantity + quantity)
        const token = localStorage.getItem("token")
        if ((availableQuantity + quantity) <= 0 || isNaN(quantity)) {
            alert("Enter a valid quantity")
            return
        }
        const data = {
            productId: productId,
            quantity: quantity
        };
        const response = await fetch(`http://localhost:8080/inventry/updateStock`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error("Error while updating product");
        }
        getProductById(productId);
        document.getElementById("editModal").style.display = "none";
    } catch (error) {
        console.log(error.message);
    }
};
function goBack() {
    window.location.href = "front.html"
}
document.getElementById("save-btn").addEventListener("click", updateProduct);
document.addEventListener("DOMContentLoaded", getProductById)