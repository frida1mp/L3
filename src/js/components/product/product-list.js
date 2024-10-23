class ProductListing extends HTMLElement {
  constructor() {
    super()

    // Attach a shadow DOM tree
    this.attachShadow({ mode: 'open' })

    // Define styles for the component
    const template = document.createElement('template')
    template.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .product {
          border: 1px solid #ddd;
          padding: 10px;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
        }
        .product img {
          max-width: 150px;
          margin-right: 20px;
        }
        .product h3 {
          margin: 0;
        }
        .product p {
          margin: 5px 0;
        }
          </style>
      `

    this.shadowRoot.appendChild(template)

    this.container = document.createElement('div')
    this.shadowRoot.appendChild(this.container)

    this.loadProducts()
  }

  async loadProducts() {
    try {
      const response = await fetch('products.json')
      const cars = await response.json()

      // Display the products in the container
      this.displayProducts(cars)
    } catch (error) {
      console.error('Failed to load products:', error)
    }
  }

  displayProducts(cars) {
    // Clear any existing content
    this.container.innerHTML = `
        <style>
        #products {
        text-align: left;
        }
        </style>
        <h2 >Available cars</h2>
        `

    // Create product elements for each car
    cars.forEach(car => {
      const productDiv = document.createElement('div')
      productDiv.classList.add('product')

      productDiv.innerHTML = `
      <div id="products">
          <img src="${car.image}" alt="${car.name}">
          <div>
            <h3>${car.name}</h3>
            <p>${car.description}</p>
            <p>Price: $${car.price}</p>
          </div>
      </div>
        `
      this.container.appendChild(productDiv)
    })
  }
}

// Define the custom element
customElements.define('product-listing', ProductListing)