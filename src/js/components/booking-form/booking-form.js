/**
 * The booking-form web component module.
 *
 * @author Frida Pedersén <fp222ni@student.lnu.se>
 * @version 1.1.0
 */

// Define template.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    .container {
      font-size: 1.2em;
      color:black;
      padding: 1em;
      margin: 1em;
      border: 2px solid black;
    }
    .inputField {
      margin: 2px;
    }
    .hidden {
      display: none;
    }
    .visible {
      display: block;
    }
    select {
      margin-top: 10px;
    }
  </style>

  <div class="container">
    <!-- Step 1: Input customer details -->
    <div id="customerDetails">
      <label for="name">Name:</label>
      <input type="text" id="name" class="inputField">
      <label for="email">Email:</label>
      <input type="email" id="email" class="inputField">
      <button id="nextButton">Next</button>
    </div>

    <!-- Step 2: Select product -->
    <div id="productSelection" class="hidden">
      <h3>Select a product</h3>
      <select id="productDropdown"></select>
      <button id="submitBooking">Submit Booking</button>
    </div>
  </div>
`

customElements.define('booking-form',
  /**
   * Represents a nickname-form element.
   */
  class extends HTMLElement {
    #name = ''
    #email = ''
    #products = []
    #selectedProduct = ''

    #nextButton
    #submitButton
    #productDropdown

    constructor() {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.#nextButton = this.shadowRoot.querySelector('#nextButton')
      this.#submitButton = this.shadowRoot.querySelector('#submitBooking')
      this.#productDropdown = this.shadowRoot.querySelector('#productDropdown')
    }


    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback() {
      // Add keydown event listener to the input field
      this.#nextButton.addEventListener('click', this.handleNextClick())
      this.#submitButton.addEventListener('click', () => this.handleSubmitBooking())

      this.fetchProducts()
    }
    
    async fetchProducts () {
      try {
        const response = await fetch('products.json')
        this.#products = await response.json()

        this.addToProductDropdown()

      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }

    addToProductDropdown() {
      this.#productDropdown.innerHTML = ''

      this.#products.forEach(product => {
        const option = document.createElement('option')
        option.value = product.name
        option.textContent = `${product.name} - $${product.price}`
        this.#productDropdown.appendChild(option)
      })

      // Set the initial selected product
      this.#selectedProduct = this.#productDropdown.value
      this.#productDropdown.addEventListener('change', () => {
        this.#selectedProduct = this.#productDropdown.value
      })
    }

    handleNextClick() {
      const nameValue = this.shadowRoot.querySelector('#name')
      const emailValue = this.shadowRoot.querySelector('#email')

      // Validate the fields
      if (nameValue.value.trim() === '' || emailValue.value.trim() === '') {
        alert('Please enter both name and email.')
        return
      }

      // Store the values
      this.#name = nameInput.value.trim()
      this.#email = emailInput.value.trim()

      // Show product selection step
      this.toggleStepVisibility()
    }


  }
)

