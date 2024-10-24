import { App } from '../js/modules/app.js'
import * as BookingManager from 'booking-manager-module'
import { LocalStorageAdapter } from '../js/modules/localStorageAdapter.js'
import { jest } from '@jest/globals'
import { Product } from 'booking-manager-module/src/bookingManager/product.js'



jest.mock('booking-manager-module', () => ({
    someFunction: jest.fn(),
    anotherFunction: jest.fn(),
}))
jest.mock('./src/js/modules/localStorageAdapter.js')



describe('App', () => {
    let app
    beforeEach(() => {
        app = new App()
        app.carApp = {
            renderProducts: jest.fn()
        }
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should fetch products and render them', async () => {
        const mockProducts = [
            new Product('Car A', 'testA', 100),
            new Product('Car B', 'testB', 200) 
        ]
        console.log('mo', mockProducts)
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(mockProducts)
        })

        await app.fetchProducts()

        expect(app.products.length).toBe(2)
// Ensure that renderProducts was called with the correct products
expect(app.carApp.renderProducts).toHaveBeenCalledWith(
    expect.arrayContaining([
        expect.objectContaining({
            name: 'Car A',
            description: 'testA',
            price: 100,
            available: true,
        }),
        expect.objectContaining({
            name: 'Car B',
            description: 'testB',
            price: 200,
            available: true,
        }),
    ])
)    })
})