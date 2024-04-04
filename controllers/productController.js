const ProductsFormDB = require('../models/product')

const getProductById = async (req, res) => {
  try {
    const id = req.params.categoryID
    const product = await ProductsFormDB.findById(id)
    res.send(product)
  } catch (err) {
    res.status(404).send('category not found')
  }
}

const getProductByIdAndCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.categoryID
    const productId = req.params.productID
    const product = await ProductsFormDB.findById(productId)
    if (product.categoryId === categoryId) { res.send(product) } else {
      res.status(404).send('product exist in another category')
    }
  } catch (err) {
    res.status(404).send('product not found')
  }
}

const addProduct = async (req, res) => {
  try {
    const newProduct = new ProductsFormDB({ name: req.body.name, categoryId: req.body.categoryId })
    await newProduct.save()
    res.status(201).send('Product added successfully')
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
}

const updateProduct = async (req, res, err) => {
  try {
    const id = req.params.productId
    await ProductsFormDB.findByIdAndUpdate(id, { name: req.body.name, categoryId: req.body.category })
    res.send('Product updated successfully')
  } catch (err) {
    res.status(404).send('product not found')
  }
}

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.productId
    await ProductsFormDB.findByIdAndDelete(id)
    res.send('Product deleted successfully')
  } catch (err) {
    res.status(404).send('product not found')
  }
}

module.exports = {
  getProductById,
  getProductByIdAndCategoryId,
  addProduct,
  updateProduct,
  deleteProduct
}
