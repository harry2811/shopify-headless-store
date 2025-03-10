const SHOPIFY_STORE_URL = "jd-sports1.myshopify.com"; // Replace with your Shopify store URL
const SHOPIFY_ACCESS_TOKEN = "bfb2421abeb9d11f11002e2f3772c164"; // Replace with your Storefront API token

async function fetchProducts() {
    const query = `
        {
            products(first: 10) {
                edges {
                    node {
                        id
                        title
                        handle
                        images(first: 1) {
                            edges {
                                node {
                                    src
                                }
                            }
                        }
                    }
                }
            }
        }
    `;

    const res = await fetch(`https://${jd-sports1.myshopify.com}/api/2024-01/graphql.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": bfb2421abeb9d11f11002e2f3772c164,
        },
        body: JSON.stringify({ query }),
    });

    const data = await res.json();
    displayProducts(data.data.products.edges);
}

function displayProducts(products) {
    const container = document.getElementById("products-container");
    container.innerHTML = ""; // Clear previous content

    products.forEach(({ node }) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <h2>${node.title}</h2>
            <img src="${node.images.edges[0]?.node.src}" alt="${node.title}">
        `;
        container.appendChild(productDiv);
    });
}

fetchProducts();
