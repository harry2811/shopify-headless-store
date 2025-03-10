const storeUrl = "https://jd-sports1.myshopify.com/api/2023-01/graphql.json"; 
const storefrontAccessToken = "bfb2421abeb9d11f11002e2f3772c164"; // Replace with new token if needed

async function fetchProducts() {
    const query = `
        {
            products(first: 20) {
                edges {
                    node {
                        id
                        title
                        description
                        images(first: 1) {
                            edges {
                                node {
                                    url
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch(storeUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": "bfb2421abeb9d11f11002e2f3772c164"
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Log API response for debugging
        console.log("API Response:", data);

        // Ensure we have product data before displaying
        if (data.data && data.data.products) {
            displayProducts(data.data.products.edges);
        } else {
            console.error("No products found or incorrect API response format.");
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayProducts(products) {
    const productsContainer = document.getElementById("products");
    
    // Clear previous content
    productsContainer.innerHTML = "";

    // Loop through each product and create elements
    products.forEach(({ node }) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <h2>${node.title}</h2>
            <img src="${node.images.edges[0]?.node.url || ''}" alt="${node.title}" width="150">
            <p>${node.description || 'No description available'}</p>
        `;
        productsContainer.appendChild(productElement);
    });
}

// Fetch products on page load
fetchProducts();
