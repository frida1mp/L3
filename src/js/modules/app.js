import { BookingManager } from 'booking-manager-module'
import { LocalStorageAdapter } from './localStorageAdapter'
import '../components/car-application/carApplication.js'
import '../components/booking-form/bookingForm.js'

export class App {
  products = []
  #bookingManager
  #bookings = []

  constructor() {
    const localStorageAdapter = new LocalStorageAdapter()
    this.#bookingManager = new BookingManager(localStorageAdapter)

    this.carApp = document.createElement('car-application')
    document.body.appendChild(this.carApp)

    this.carApp.initializeBookingManager(this.#bookingManager)

    this.fetchProducts()

    const carAppRoot = this.carApp.shadowRoot
    this.bookingForm = carAppRoot.querySelector('booking-form')

    this.bookingForm.addEventListener('bookingRequestAdded', this.#handleBookingAdded.bind(this))
  }

  async fetchProducts() {
    try {
      const response = await fetch('/products.json')
      this.fetchedProducts = await response.json()

      for (const product of this.fetchedProducts) {
        const newProduct = await this.#bookingManager.addProduct(product)
        this.products.push(newProduct)
      }
      this.carApp.renderProducts(this.products)
    } catch (error) {
      this.#handleError(error, 'Error when fetching products')
    }
  }

  async #handleBookingAdded(event) {
    try {
      const { customer, selectedProduct, selectedDate } = event.detail

      const newCustomer = await this.#saveCustomer(customer)

      const newBooking = await this.#saveBooking({
        customerId: newCustomer.id,
        productId: selectedProduct.id,
        selectedDate
      })

      this.#bookings.push(newBooking)
      this.carApp.handleBookingSaved(newBooking)

      alert(`Booking complete! You will recieve an email with the details of your booking. \nChosen car: ${newBooking.product.name}\nDate booked: ${newBooking.date}\nYour email: ${newBooking.customer.email}`)
    } catch (error) {
      this.#handleError(error, 'Error when adding booking')
    }
  }

  async #saveBooking(bookingData) {
    try {
      const newBooking = await this.#bookingManager.addBooking(bookingData.productId, bookingData.customerId, bookingData.selectedDate)

      return newBooking
    } catch (error) {
      this.#handleError(error, 'Error when saving booking')

      return {}
    }
  }

  async #saveCustomer(customer) {
    try {
      const newCustomer = await this.#bookingManager.addCustomer(customer)

      return newCustomer
    } catch (error) {
      this.#handleError(error, 'Error when saving booking')

      return {}
    }
  }

  #handleError(error, customMessage) {
    console.error(`${customMessage}: ${error.message}`)
    throw new Error(error, customMessage)
  }
}

const app = new App()
