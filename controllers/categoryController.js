const CategoriesFromDB = require('../models/category')

const getAllCategories = async (req, res) => {
  try {
    const category = await CategoriesFromDB.find()
    const sortedCategory = category.toSorted((a, b) => {
      return a.name.localeCompare(b.name)
    })
    res.send(sortedCategory)
  } catch (err) {
    res.status(404).send('categories not found')
  }
}

const getCategoryById = async (req, res) => {
  try {
    const id = req.params.categoryID
    const oneCategory = await CategoriesFromDB.findById(id)
    if (!oneCategory) {
      res.status(404).send('Category not found or you didn\'t provide a category ID in the request')
      return
    }
    res.send(oneCategory)
  } catch (err) {
    res.status(500).send('Internal Server Error')
  }
}

const addCategory = async (req, res) => {
  try {
    const newCategory = new CategoriesFromDB({ name: req.body.name })
    await newCategory.save()
    res.send('the category added successfully')
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const updateCategory = async (req, res) => {
  try {
    const id = req.params.categoryID
    await CategoriesFromDB.findByIdAndUpdate(id, { name: req.body.name })
    res.send('the category updated successfully')
  } catch (err) {
    res.status(404).send('Cannot update not found category  ' + err.message)
  }
}

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.categoryID
    await CategoriesFromDB.findByIdAndDelete(id)
    res.send('the category deleted successfully')
  } catch (err) {
    res.status(404).send('Cannot delete category ')
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
}
