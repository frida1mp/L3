import StorageInterface from 'booking-manager-module/src/storage/storageInterface.js'

/**
 * Represents the localStorage
 */
export class LocalStorageAdapter extends StorageInterface {
  /**
   * Initializes LocalStorageAdapter
   */
  constructor () {
    super()
    this.bookings = 'bookings'
    this.products = 'products'
    this.customers = 'customers'
  }

  /**
   * Retrieves all bookings from localStorage.
   *
   * @returns {Array} -  and array of bookings.
   */
  getAllBookings () {
    const bookings = localStorage.getItem(this.bookings)
    return bookings ? JSON.parse(bookings) : []
    // eslint-disable-next-line indent
    }

  /**
   * Saves a booking to the bookings collection.
   *
   * @param {object} booking - the new booking.
   */
  saveBooking (booking) {
    localStorage.setItem(this.bookings, JSON.stringify(booking))
  }

  /**
   * Retrieves all products from localStorage.
   *
   * @returns {Array} -  and array of products.
   */
  getAllProducts () {
    const products = localStorage.getItem(this.products)
    return products ? JSON.parse(products) : []
  }

  /**
   * Saves a product to the products collection.
   *
   * @param {object} product - new product
   */
  saveProduct (product) {
    console.log('inside saveProd', JSON.stringify(product))
    try {
      localStorage.setItem(this.products, JSON.stringify(this.products))
      console.log('Product saved to localStorage:', product)
    } catch (error) {
      console.error('error in saveProduct()')
    }
  }
}
