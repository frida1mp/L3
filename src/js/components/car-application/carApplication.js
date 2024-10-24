/**
 * The carApplication web component module.
 *
 * @author Frida Pedersén <fp222ni@student.lnu.se>
 * @version 1.1.0
 */

import '../booking-form/index.js'
import '../product/index.js'
import '../booking/bookingListing.js'

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

    #buttonContainer {
      align-items: center;
    }

  </style>
  <div id="buttonContainer">
  <button id="createBookingButton" tabindex="0">Create booking</button>
  <button id="viewBookingButton" tabindex="0">View your booking</button>
  </div>
  <div id="bookingForm"></div>
  <div id="productList"></div>

  `
customElements.define('car-application',

  class extends HTMLElement {
    #bookingForm
    #productList
    #createBookingButton
    #viewBookingButton
    #bookings = []
    #products = []
    #bookingManager
    #bookingListing


    constructor() {
      super()
      this.#attachTemplate()
      this.#initializeElements()


      this.#bookingForm.setProducts(this.#products)
    }

    connectedCallback() {
      this.#setupEventListeners()

    }

    #setupEventListeners() {
      this.#createBookingButton.addEventListener('click', this.#showBookingForm.bind(this))
      this.#viewBookingButton.addEventListener('click', this.#showBookingListing.bind(this))
    }

    #showBookingForm() {
      console.log('?', this._products)
      this.#toggleVisibility(this.#createBookingButton, false)
      this.#toggleVisibility(this.#bookingForm, true)
      this.#toggleVisibility(this.#productList, false)
      this.#toggleVisibility(this.#viewBookingButton, false)
    }

    initializeBookingManager(bookingManager) {
      this.#bookingManager = bookingManager
    }

    #attachTemplate() {
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))
    }

    #initializeElements() {
      this.#createBookingButton = this.shadowRoot.querySelector('#createBookingButton')
      this.#viewBookingButton = this.shadowRoot.querySelector('#viewBookingButton')

      this.#productList = this.#createElement('product-listing')
      this.#bookingForm = this.#createBookingForm()
      this.#bookingListing = this.#createElement('booking-listing')

      this.#hideElements([this.#bookingForm, this.#bookingListing])
    }

    #createElement(tag) {
      const element = document.createElement(tag)
      this.shadowRoot.appendChild(element)
      return element
    }

    #hideElements(elements) {
      elements.forEach(element => element.style.display = 'none')
    }

    #showElements(elements) {
      elements.forEach(element => element.style.display = 'block')
    }

    #showBookingListing() {
      this.#toggleVisibility(this.#bookingListing, true)
      this.#toggleVisibility(this.#productList, false)
      this.#bookingListing.initialize(this.#bookings)
    }

    #createBookingForm() {
      const bookingForm = this.#createElement('booking-form')
      bookingForm.setProducts(this.#products)
      return bookingForm
    }

    #toggleVisibility(element, shouldShow) {
      element.style.display = shouldShow ? 'block' : 'none'
    }

    // Gets products from app
    async renderProducts(products) {
      try {
        console.log('feteched in render', products)

        for (const product of products) {
          const newProduct = await this.#bookingManager.addProduct(product)
          this.#products.push(newProduct)
        }
        console.log('all prods', this.#products)

      } catch (error) {
        console.error('Failed to fetch products:', error)
      }
    }

    handleBookingSaved(booking) {
      console.log('car-app, handleBookingSaved')
      this.#showElements([this.#viewBookingButton, this.#createBookingButton, this.#productList])
      this.#hideElements([this.#bookingForm])
    }
    //   const { customer, selectedProduct, selectedDate } = event.detail;

    //   const newCustomer = await this.#saveCustomer(customer)

    //   const newBooking = await this.#saveBooking({
    //     customerId: newCustomer.id,
    //     productId: selectedProduct.id,
    //     selectedDate
    //   })

    //   this.#bookings.push(newBooking)

    //   // Perform any additional actions you want here, e.g., showing a message
    //   alert(`Booking complete! You will recieve an email with the details of your booking. \nChosen car: ${newBooking.product.name}\nDate booked: ${newBooking.date}\nYour email: ${newBooking.customer.email}`)
    //   this.#showElements([this.#viewBookingButton, this.#createBookingButton, this.#productList])
    //   this.#hideElements([this.#bookingForm])
    // }

    // async #saveBooking(bookingData) {
    //   console.log('all', bookingData.productId)
    //   const newBooking = await this.#bookingManager.addBooking(bookingData.productId, bookingData.customerId, bookingData.selectedDate)
    //   return newBooking
    // }

    // async #saveCustomer(customer) {
    //   const newCustomer = await this.#bookingManager.addCustomer(customer)
    //   return newCustomer
    // }

  })
