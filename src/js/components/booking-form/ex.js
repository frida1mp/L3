import { BookingManager } from "booking-manager-module"
import { MongoStorage } from "./mongostorage"

const storage = new MongoStorage()
const bookingManager = new BookingManager(storage)

const customer = {
    name: 'Test user',
    email: 'test@test.com'
}

const newCustomer = bookingManager.addCustomer(customer) // Returns the customer object

const product = {
    name: 'Test product',
    description: 'my product',
    price: 100
}

const newProduct = bookingManager.addProduct(product) // Returns the product object

const booking = {
    productId: newProduct.id,
    customerId: newCustomer.id,
    date: new Date()
}

bookingManager.addBooking(booking) // Returns the booking object