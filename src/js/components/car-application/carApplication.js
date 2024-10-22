/**
 * The carApplication web component module.
 *
 * @author Frida Pedersén <fp222ni@student.lnu.se>
 * @version 1.1.0
 */

import '../booking-form/index.js'
import '../product/index.js'

// Define template.
const template = document.createElement('template')
template.innerHTML = `
  <style>
    :host {
    }
    p {
      padding: 0;
    }
      #productList {
      margin: 20px 0;
    }

    .product {
      border: 1px solid #000;
      padding: 10px;
      margin-bottom: 10px;
    }

    #bookingForm {
      display: none;
      padding: 10px;
      border: 1px solid #000;
    }
    
    #createBookingButton {
      margin: 20px 0;
    }

     #customerForm {
      display: none;
      padding: 10px;
      border: 1px solid #000;
    }

     #createCustomerButton {
      margin: 20px 0;
    }

  </style>

  <button id="createBookingButton" tabindex="0">Create booking</button>
  <div id="bookingForm"></div>
  <button id="createCustomerButton" tabindex="0">Create new customer</button>
  <div id="customerForm"></div>
  `
customElements.define('car-application',
  /**
   * Represents a car-app element.
   */
  class extends HTMLElement {
    #bookingForm
    #customerForm
    #productList
    #createBookingButton
    #createCustomerButton

    /**
     * Creates an instance of the current type.
     */
    constructor() {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      const productList = document.createElement('product-listing')
      this.shadowRoot.appendChild(productList)

      this.#productList = productList


      this.#createBookingButton = this.shadowRoot.querySelector('#createBookingButton')

      this.#createCustomerButton = this.shadowRoot.querySelector('#createCustomerButton')

      const bookingForm = document.createElement('booking-form')
      this.shadowRoot.appendChild(bookingForm)

      this.#bookingForm = bookingForm

      this.#bookingForm.style.display = 'none'

      const customerForm = document.createElement('customer-form')
      this.shadowRoot.appendChild(customerForm)

      this.#customerForm = customerForm
    }

      /**
       * Called when the element is inserted to the DOM.
       */
      connectedCallback() {
        this.#createBookingButton.addEventListener('click', this.handleCreateBookingClick.bind(this))
      }



    handleCreateBookingClick() {
      console.log('test')
      this.#bookingForm.style.display = 'block'
      this.#productList.style.display = 'none'
    }
  })