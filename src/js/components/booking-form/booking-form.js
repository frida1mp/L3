/**
 * The booking-form web component module.
 *
 * @author Frida Pedersén <fp222ni@student.lnu.se>
 * @version 1.1.0
 */
import { LocalStorageAdapter } from "../../modules/localStorage"
import { BookingManager } from "booking-manager-module"

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
      <button id="doneButton">Done</button>
    </div>

    <!-- Picker for selecting booking date -->
      <input type="date" id="bookingDate" class="inputField">
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
    #selectedDate = ''

    #nextButton
    #doneButton
    #productDropdown
    #dateInput

    constructor() {
      super()


      this.localStorage = new LocalStorageAdapter()
      this.bookingManager = new BookingManager(this.localStorage)

      console.log('test:', this.bookingManager.customers)

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
      this.#nextButton = this.shadowRoot.querySelector('#nextButton')
      this.#doneButton = this.shadowRoot.querySelector('#doneButton')
      this.#productDropdown = this.shadowRoot.querySelector('#productDropdown')
      this.#dateInput = this.shadowRoot.querySelector('#bookingDate')

      this.#dateInput.style.display = 'none'
    }


    /**
     * Called after the element is inserted into the DOM.
     */
    connectedCallback() {
      this.#nextButton.addEventListener('click', this.handleNextClick.bind(this))
      this.#doneButton.addEventListener('click', () => this.handleRequestBooking())

      this.fetchProducts()
    }

    async fetchProducts() {
      try {
        const response = await fetch('products.json')
        this.fetchedProducts = await response.json()

        for (const product of this.fetchedProducts) {
          const newProduct = await this.bookingManager.addProduct(product)
          this.#products.push(newProduct)
        }
        console.log('all prods', this.#products)
        this.addToProductDropdown()

      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }

    addToProductDropdown() {
      console.log('inside dropdown')
      this.#productDropdown.innerHTML = ''

      this.#products.forEach(product => {
        console.log('product1', product)
        const option = document.createElement('option')
        option.value = product.id
        console.log('option value:', option.value)
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
      this.#dateInput.style.display = 'block'
      const nameValue = this.shadowRoot.querySelector('#name')
      const emailValue = this.shadowRoot.querySelector('#email')

      // Validate the fields
      if (nameValue.value.trim() === '' || emailValue.value.trim() === '') {
        alert('Please enter both name and email.')
        return
      }

      // Store the values
      this.#name = nameValue.value.trim()
      this.#email = emailValue.value.trim()

      console.log('input:', this.#name, this.#email)
      // Show product selection step
      this.toggleStepVisibility()
    }

    toggleStepVisibility() {
      const customerData = this.shadowRoot.querySelector('#customerDetails')
      const productSelection = this.shadowRoot.querySelector('#productSelection')

      customerData.classList.toggle('hidden')
      productSelection.classList.toggle('hidden')
    }

    async handleRequestBooking() {
      try {

        const selectedDateValue = this.#dateInput.value
        if (!selectedDateValue) {
          alert('Please select a booking date.')
          return
        }
        this.#selectedDate = new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric'
        })
        

        console.log('inside submit book')
        const customer = {
          name: this.#name,
          email: this.#email
        }

        const newCustomer = await this.bookingManager.addCustomer(customer)
        console.log('newccustomer', newCustomer)

        const newProduct = await this.#products.find(product => product.id === this.#selectedProduct)
        console.log('newProduct found:', newProduct)

        const booking = {
          productId: newProduct.id,
          customerId: newCustomer.id,
          date: this.#selectedDate
        }

        console.log('booking pushed', booking)
        const newBooking = await this.bookingManager.addBooking(booking.productId, booking.customerId, booking.date)

        if (typeof newBooking === 'object' && newBooking !== null) {
          const bookingEvent = new CustomEvent('bookingAdded', {
            detail: { newBooking },
            bubbles: true, // Allow event to bubble up through the DOM
            composed: true // Allow event to cross the shadow DOM boundary
          });

          this.dispatchEvent(bookingEvent);
        }
      } catch (error) {
        console.error('Failed to create booking:', newBooking)
      }


    }


  }
)

