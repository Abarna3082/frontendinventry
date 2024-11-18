function displayAllProducts() {
    const table = document.getElementById("productTable");
    table.style.display = "table";
    sortButtonContainer.style.display = "block"; // Show sort button container

    fetchProducts();
}

async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:8080/inventry/products");
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}


function renderProducts(products) {

    const tableHead=document.querySelector("#productTable thead tr")
    tableHead.innerHTML=" "
    tableHead.innerHTML= `<tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>View</th>
        </tr>`
    const tableBody = document.querySelector("#productTable tbody");
    tableBody.innerHTML = "";

    

    products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.productId}</td>
            <td>${product.productName}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td><button class="view-btn" data-product-id="${product.productId}">View</button></td>
        `;
        tableBody.appendChild(row);
    });
    document.querySelectorAll(".view-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const productId = event.target.getAttribute("data-product-id");
            console.log(productId)
            openUpdatePage(productId);
        });
    });
}
function openUpdatePage(productId) {
    window.location.href = `update.html?productId=${productId}`;
}
async function sortProducts() {
    try {
        const response = await fetch("http://localhost:8080/inventry/sortedByPrice");

        if (!response.ok) {
            throw new Error("Error fetching sorted products");
        }

        const sortedProducts = await response.json();
        renderProducts(sortedProducts);
    } catch (error) {
        console.error("Error sorting products:", error);
    }
}

function openProductIdModal() {
    document.getElementById("productIdModal").style.display = "block";
}

function closeProductIdModal() {
    document.getElementById("productIdModal").style.display = "none";
}

async function viewProductById() {
    const productId = document.getElementById("productIdInput").value.trim();

    if (!productId) {
        alert("Product ID is required.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/inventry/products/${productId}`);

        if (!response.ok) {
            alert("Product not found.");
            return;
        }

        const product = await response.json();
        const table = document.getElementById("productTable");
        table.style.display = "table";
        sortButtonContainer.style.display = "none";

        const tableHead=document.querySelector("#productTable thead tr")
        // tableHead.innerHTML=" "
        tableHead.innerHTML= `<tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>`


        const tableBody = document.querySelector("#productTable tbody");
        tableBody.innerHTML = "";
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.productId}</td>
            <td>${product.productName}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
        `;
        tableBody.appendChild(row);

        closeProductIdModal();
    } catch (error) {
        console.error("Error fetching product:", error);
    }
}


function openCategoryModal() {
    document.getElementById("categoryModal").style.display = "block";
}

function closeCategoryModal() {
    document.getElementById("categoryModal").style.display = "none";
}

async function viewByCategory() {
    const category = document.getElementById("categorySelect").value;

    if (!category) {
        alert("Please select a category.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/inventry/getByCategory/${category}`);

        if (!response.ok) {
            alert("No products found in this category.");
            return;
        }

        const products = await response.json();
        const table = document.getElementById("productTable");
        table.style.display = "table";
        sortButtonContainer.style.display = "none";

        const tableHead=document.querySelector("#productTable thead tr")
        // tableHead.innerHTML=" "
        tableHead.innerHTML= `<tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>`


        const tableBody = document.querySelector("#productTable tbody");
        // tableBody.innerHTML = `<tr>
        //         <th>Product ID</th>
        //         <th>Product Name</th>
        //         <th>Quantity</th>
        //         <th>Price</th>
        //         <th>View</th>
        //     </tr>`;
        tableBody.innerHTML=" "

        products.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.productId}</td>
                <td>${product.productName}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                
            `;
            tableBody.appendChild(row);
        });

        closeCategoryModal();
    } catch (error) {
        console.error("Error fetching products by category:", error);
    }
}


function openEdit() {
    document.getElementById("EditIdModal").style.display = "block";
}

function closeEdit() {
    document.getElementById("EditIdModal").style.display = "none";
}
function goBack() {
    window.location.href = "front.html"
}


window.onclick = function (event) {
    const productIdModal = document.getElementById("productIdModal");
    const categoryModal = document.getElementById("categoryModal");
    const deleteCategoryModal = document.getElementById("deleteCategoryModal");

    if (event.target === productIdModal) {
        closeProductIdModal();
    }
    if (event.target === categoryModal) {
        closeCategoryModal();
    }
};