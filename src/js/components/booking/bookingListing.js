class BookingListing extends HTMLElement {
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
          .booking {
            border: 1px solid #ddd;
            padding: 10px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }
            </style>
        `
  
      this.shadowRoot.appendChild(template)
  
      this.container = document.createElement('div')
      this.shadowRoot.appendChild(this.container)
  
      this.loadBookings()
    }
  
    async loadBookings() {
      try {
        localStorage.getItem
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
      
          `
        this.container.appendChild(productDiv)
      })
    }
  }
  
  // Define the custom element
  customElements.define('booking-listing', BookingListing)