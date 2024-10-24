/**
 * The booking-form web component module.
 *
 * @author Frida Pedersén <fp222ni@student.lnu.se>
 * @version 1.1.0
 */

const template = document.createElement('template')
template.innerHTML = `
  <style>
  
    .container {
      font-size: 1.2em;
      color:rgb(76, 76, 76);
      padding: 1em;
      margin: 1em;
      border: 2px solid black;
    }
    .inputField {
      margin: 2px;
      color: black;
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
    label {
      color: white;
    }
     #productSelection {
     }   
    #productDropdown {
      margin: 2px;
      background-color: white;
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
      <input type="date" id="bookingDate" class="inputField">
    </div>

  </div>
`

customElements.define('booking-form',

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

      this.bookingManager = null
      this.#attachTemplate()
      this.#initializeElements()
    }

    connectedCallback() {
      this.#setupEventListeners()
    }

    #attachTemplate() {
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }

    #initializeElements() {
      this.#nextButton = this.shadowRoot.querySelector('#nextButton')
      this.#doneButton = this.shadowRoot.querySelector('#doneButton')
      this.#productDropdown = this.shadowRoot.querySelector('#productDropdown')
      this.#dateInput = this.shadowRoot.querySelector('#bookingDate')

      this.#dateInput.style.display = 'none'
    }

    #setupEventListeners() {
      this.#nextButton.addEventListener('click', this.#handleNextClick.bind(this))
      this.#doneButton.addEventListener('click', () => this.#handleRequestBooking())
      this.#productDropdown.addEventListener('change', () => {
        this.#selectedProduct = this.#productDropdown.value
      })
    }

    #hideElements(elements) {
      elements.forEach(element => element.style.display = 'none')
    }

    #showElements(elements) {
      elements.forEach(element => element.style.display = 'block')
    }

    setProducts(products) {
      this.#products = products
    }

    #addToProductDropdown() {
      this.#productDropdown.innerHTML = ''

      this.#products.forEach(product => {
        const option = document.createElement('option')
        option.value = product.id
        option.textContent = `${product.name} - $${product.price}`
        this.#productDropdown.appendChild(option)
      })
      this.#selectedProduct = this.#productDropdown.value
    }

    #handleNextClick() {
      this.#addToProductDropdown()
      const nameValue = this.shadowRoot.querySelector('#name')
      const emailValue = this.shadowRoot.querySelector('#email')

      if (nameValue.value.trim() === '' || emailValue.value.trim() === '') {
        alert('Please enter both name and email.')

        return
      }

      this.#name = nameValue.value.trim()
      this.#email = emailValue.value.trim()

      this.#toggleStepVisibility()
      this.#showElements([this.#dateInput])
    }

    #toggleStepVisibility() {
      const customerData = this.shadowRoot.querySelector('#customerDetails')
      const productSelection = this.shadowRoot.querySelector('#productSelection')

      this.#hideElements([customerData])
      this.#showElements([productSelection])
    }

    async #handleRequestBooking() {
      try {
        const selectedDateValue = this.#dateInput.value
        if (!selectedDateValue) {
          alert('Please select a booking date.')

          return
        }

        const customer = {
          name: this.#name,
          email: this.#email
        }

        const selectedProduct = await this.#products.find(product => product.id === this.#selectedProduct)

        const selectedDate = new Date()

        const bookingRequestEvent = new CustomEvent('bookingRequestAdded', {
          detail: { customer, selectedProduct, selectedDate },
          bubbles: true,
          composed: true
        })

        this.dispatchEvent(bookingRequestEvent)
      } catch (error) {
        console.error('Failed to create booking:', error.message)
      }
    }

    async #viewBookingById(email) {
      const bookings = this.bookingManager.getAllBookings()
      const bookingWithEmail = bookings.find(booking => booking.customer.email === email)
      const booking = bookingWithEmail
    }
  }
)
