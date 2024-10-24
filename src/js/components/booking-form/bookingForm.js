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
    }

    setProducts(products) {
      this.#products = products
    }
    
    addToProductDropdown() {
      console.log('inside dropdown')
      this.#productDropdown.innerHTML = ''
      console.log('testing12:', this.#products)
      this.#products.forEach(product => {
        console.log('product1324', product)
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
      this.addToProductDropdown()
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

        console.log('inside submit book')
        const customer = {
          name: this.#name,
          email: this.#email
        }

        const selectedProduct = await this.#products.find(product => product.id === this.#selectedProduct)

        const selectedDate = new Date()


        const bookingRequestEvent = new CustomEvent('bookingRequestAdded', {
          detail: { customer, selectedProduct, selectedDate },
          bubbles: true, // Allow event to bubble up through the DOM
          composed: true // Allow event to cross the shadow DOM boundary
        });

        this.dispatchEvent(bookingRequestEvent);

      } catch (error) {
        console.error('Failed to create booking:', error.message)
      }
    }
    async viewBookingById(email) {
      const bookings = this.bookingManager.getAllBookings()
      const bookingWithEmail = bookings.find(booking => booking.customer.email === email)
      const booking = bookingWithEmail
      console.log('fetched?', booking)
    }


  }
)

