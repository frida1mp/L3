/**
 * The carApplication web component module.
 *
 * @author Frida Pedersén <fp222ni@student.lnu.se>
 * @version 1.1.0
 */

import '../booking-form/index.js'
import '../product/index.js'
import '../booking/bookingListing.js'
import { BookingManager } from 'booking-manager-module'
import { LocalStorageAdapter } from '../../modules/localStorageAdapter.js'

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
      background-color: white;
      font-weight: bold;
      border-radius: 6px;
    }

     #customerForm {
      display: none;
      padding: 10px;
      border: 1px solid #000;
    }

    #viewBookingButton {
      margin: 20px 0;
      background-color: white;
      font-weight: bold;
      border-radius: 6px;
    }

     #createCustomerButton {
      margin: 20px 0;
      background-color: white;
      font-weight: bold;
      border-radius: 6px;
    }

  </style>

  <button id="createBookingButton" tabindex="0">Create booking</button>
  <div id="bookingForm"></div>
  <button id="createCustomerButton" tabindex="0">Create new customer</button>
  <button id="viewBookingButton" tabindex="0">View your booking</button>
  <div id="customerForm"></div>
  <div id="productList"></div>

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
    #viewBookingButton
    #bookings
    #products = []
    #bookingManager

    /**
     * Creates an instance of the current type.
     */
    constructor() {
      super() 

      const storage = new LocalStorageAdapter()
      this.#bookingManager = new BookingManager(storage)

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

        this.fetchProducts()

      const productList = document.createElement('product-listing')
      this.shadowRoot.appendChild(productList)

      this.#productList = productList

      const bookings = document.createElement('booking')
      this.shadowRoot.appendChild(bookings)

      this.#bookings = bookings
      this.#bookings.style.display = 'none'

      this.#createBookingButton = this.shadowRoot.querySelector('#createBookingButton')
      this.#viewBookingButton = this.shadowRoot.querySelector('#viewBookingButton')

      const bookingForm = document.createElement('booking-form')
      bookingForm.setProducts(this.#products)
      this.shadowRoot.appendChild(bookingForm)

      this.#bookingForm = bookingForm

      this.#bookingForm.style.display = 'none'
      this.#bookingForm.addEventListener('bookingRequestAdded', this.handleBookingAdded.bind(this));


      const customerForm = document.createElement('customer-form')
      this.shadowRoot.appendChild(customerForm)

      this.#customerForm = customerForm
    }

    /**
     * Called when the element is inserted to the DOM.
     */
    connectedCallback() {
      this.#createBookingButton.addEventListener('click', this.handleCreateBookingClick.bind(this))
      this.#viewBookingButton.addEventListener('click', this.handleViewBookingClick.bind(this))
    }

     async fetchProducts() {
       try {
        const response = await fetch('products.json')
        this.fetchedProducts = await response.json()
        console.log('feteched', this.#bookingManager)

        for (const product of this.fetchedProducts) {
          const newProduct = await this.#bookingManager.addProduct(product)
          this.#products.push(newProduct)
        }
        console.log('all prods', this.#products)

      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }


    handleCreateBookingClick() {
      this.#createBookingButton.style.display = 'none'
      this.#bookingForm.style.display = 'block'
      this.#productList.style.display = 'none'
    }

    async handleBookingAdded(event) {
      const {customer, selectedProduct, selectedDate} = event.detail;

      const newCustomer = await this.saveCustomer(customer)

      const customerId = newCustomer.id
      console.log('newProduct???:', selectedProduct)


      const productId = selectedProduct.id

      const bookingData = {customerId, productId, selectedDate}

      const newBooking = await this.saveBooking(bookingData)
      console.log('booko', newBooking)

      // Perform any additional actions you want here, e.g., showing a message
      alert(`Booking complete! You will recieve an email with the details of your booking. \nChosen car: ${newBooking.product.name}\nDate booked: ${newBooking.date}\nYour email: ${newBooking.customer.email}`);
      this.#bookingForm.style.display = 'none'
      this.#productList.style.display = 'block'
    }

    async saveBooking(bookingData) {
      console.log('all', bookingData.productId)
      const newBooking = await this.#bookingManager.addBooking(bookingData.productId, bookingData.customerId, bookingData.selectedDate)
      return newBooking
    }

    async saveCustomer(customer) {
      const newCustomer = await this.#bookingManager.addCustomer(customer)
      return newCustomer
    }
 
    handleViewBookingClick() {
      this.#bookings.style.display = 'block'

    }

  })