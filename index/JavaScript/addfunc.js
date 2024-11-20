
async function submitForm() {
    const token = localStorage.getItem("token")
    if (!document.getElementById("addProductForm").checkValidity()) {
        alert("Please fill out all required fields.");
        return;
    }
    const formData = {
        productName: document.getElementById("productName").value,
        price: parseFloat(document.getElementById("price").value),
        quantity: parseInt(document.getElementById("quantity").value),
        category: {
            categoryType: document.getElementById("categoryType").value,
            brand: document.getElementById("brand").value
        }
    };
    console.log(`Bearer ${token}`)
    try {
        const response = await fetch("http://localhost:8080/inventry/addProduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            const errorData = await response.text();
            console.error("Server error response:", errorData);
            alert(`Error adding product: ${response.status} - ${response.statusText}`);
        } else {
            document.getElementById("addProductForm").style.display = 'none';
            document.getElementById("responseMessage").style.display = 'block';
        }
    } catch (error) {
        console.error("Fetch error:", error.message);
        alert(`An error occurred while adding the product: ${error.message}`);
    }
}
function addAnotherProduct() {
    document.getElementById("addProductForm").reset();
    document.getElementById("addProductForm").style.display = 'block';
    document.getElementById("responseMessage").style.display = 'none';
}

function goBack() {
    window.location.href = "front.html";
}
