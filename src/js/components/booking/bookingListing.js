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
    <div id="customerInput">
      <label for="email">Email:</label>
      <input type="email" id="email" class="inputField">
      <button id="findBookingsButton">Find Bookings</button>
    </div>
    <div id="bookingDisplay">  
    </div>
    </div>
`

customElements.define('booking-listing',

  class extends HTMLElement {
    #email = ''
    #findBookingsButton
    #bookingsCollection = []
    #allBookings = []
    constructor() {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.container = document.createElement('div')
      this.shadowRoot.appendChild(this.container)
      this.#findBookingsButton = this.shadowRoot.querySelector('#findBookingsButton')


    }
    connectedCallback() {
      this.#findBookingsButton.addEventListener('click', this.handleInputData.bind(this))
    }

    initialize(bookings) {
      this.#allBookings = bookings
    }

    async loadBookings() {
      try {
        console.log('inside loadBookings', this.#allBookings)
        for (const booking of this.#allBookings) {
          if (booking.customer.email === this.#email) {
            console.log('your email', this.#email)
            console.log('adding booking to your booking', booking)
            this.#bookingsCollection.push(booking)
          }
          console.log('returning collection', this.#bookingsCollection)
        }
        this.displayBookings()
        // Display the products in the container
      } catch (error) {
        console.error('Failed to load products:', error)
      }
    }

    async handleInputData() {
      // Clear any existing content
      this.container.innerHTML = `
          <style>
          #products {
          text-align: left;
          }
          </style>
          <h2 >Your bookings</h2>
          `

      const emailValue = this.shadowRoot.querySelector('#email')

      if (emailValue.value.trim() === '') {
        alert('Please enter your email.')
        return
      }

      this.#email = emailValue.value.trim()
      this.loadBookings()
    }

    displayBookings() {
      this.#bookingsCollection.forEach(booking => {
        const bookingDiv = document.createElement('div')
        bookingDiv.classList.add('booking')

        bookingDiv.innerHTML = `
       <div id="bookings">
          <div>
            <h3>${booking.product.name}</h3>
            <p>${booking.product.description}</p>
            <p>Price: $${booking.product.price}</p>
          </div>
      </div>
        `
        this.container.appendChild(bookingDiv)
      })
    }


    toggleStepVisibility() {
      const customerData = this.shadowRoot.querySelector('#customerDetails')
      const productSelection = this.shadowRoot.querySelector('#productSelection')

      customerData.classList.toggle('hidden')
      productSelection.classList.toggle('hidden')
    }

  })