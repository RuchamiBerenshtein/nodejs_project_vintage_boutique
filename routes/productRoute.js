const express = require('express')
const app = express.Router()
const productController = require('../controllers/productController')

app.get('/:categoryID', productController.getProductById)
app.get('/:categoryID/:productID', productController.getProductByIdAndCategoryId)
app.post('/', productController.addProduct)
app.put('/:productId', productController.updateProduct)
app.delete('/:productId', productController.deleteProduct)

module.exports = app