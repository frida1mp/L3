import StorageInterface from 'booking-manager-module/src/storage/storageInterface.js'

/**
 * Represents the localStorage
 */
export class LocalStorageAdapter extends StorageInterface {
  /**
     * Initializes LocalStorageAdapter
     */
  constructor() {
    super()
    this.bookings = 'bookings'
    this.customers = 'customers'
    this.products = 'products'
  }

  /**
     * Retrieves all bookings from localStorage.
     *
     * @returns {Array} -  and array of bookings.
     */
  getAllBookings() {
    try {
      const bookings = localStorage.getItem(this.bookings)
      if (Array.isArray(bookings)) {
        return JSON.stringify(bookings)
      }

      return []
    } catch (error) {
      console.error('Error in getAllCustomers()')
    }
  }

  getBookingById(bookingId) {
    try {
      const bookings = this.getAllBookings()
      if (bookings.length > 0) {
        const booking = bookings.find(booking => booking.id === bookingId)

        return booking
      }

      return []
    } catch (error) {
      console.error('Error in getAllCustomers()')
    }
  }

  /**
     * Saves a booking to the bookings collection.
     *
     * @param {object} booking - the new booking.
     */
  saveBooking(booking) {
    localStorage.setItem(this.bookings, JSON.stringify(booking))
  }

  /**
     * Saves a booking to the bookings collection.
     *
     * @param {object} booking - the new booking.
     */
  saveCustomer(customer) {
    try {
      localStorage.setItem(this.customers, JSON.stringify(this.customers))
    } catch (error) {
      console.error('error in saveProduct()')
    }
  }

  getAllCustomers() {
    try {
      const customers = localStorage.getItem(this.customers)
      if (Array.isArray(customers)) {
        return JSON.stringify(customers)
      }

      return []
    } catch (error) {
      console.error('Error in getAllCustomers()')
    }
  }

  /**
     * Retrieves all products from localStorage.
     *
     * @returns {Array} -  and array of products.
     */
  getAllProducts() {
    try {
      const products = localStorage.getItem(this.products)
      if (Array.isArray(products)) {
        return JSON.stringify(products)
      }

      return []
    } catch (error) {
      console.error('Error in getAllCustomers()')
    }
  }

  /**
     * Saves a product to the products collection.
     *
     * @param {object} product - new product
     */
  saveProduct(product) {
    try {
      localStorage.setItem(this.products, JSON.stringify(this.product))
    } catch (error) {
      console.error('error in saveProduct()')
    }
  }
}
