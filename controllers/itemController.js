// controllers/itemController.js
const db = require('../database/memoryDb');

class ItemController {
  getAllPaginated(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'id';
      const order = req.query.order || 'asc';
      
      if (page < 1 || limit < 1) {
        return res.status(400).json({ error: 'Page and limit must be positive numbers' });
      }
      
      if (limit > 100) {
        return res.status(400).json({ error: 'Limit cannot exceed 100 items per page' });
      }
      
      const result = db.findPaginated(page, limit, sortBy, order);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  getById(req, res) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      
      const item = db.findById(id);
      
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  create(req, res) {
    try {
      const { name, description, price, category } = req.body;
      
      const newItem = {
        name,
        description: description || '',
        price,
        category
      };
      
      const item = new (require('../models/Item'))(0, name, description || '', price, category);
      const validationErrors = item.validate();
      
      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }
      
      const createdItem = db.create(newItem);
      res.status(201).json(createdItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  update(req, res) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      
      const { name, description, price, category } = req.body;
      
      if (!name && !description && !price && !category) {
        return res.status(400).json({ error: 'No fields to update' });
      }
      
      const updateData = {
        name,
        description,
        price,
        category
      };
      
      const updatedItem = db.update(id, updateData);
      
      if (!updatedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      const item = new (require('../models/Item'))(updatedItem.id, updatedItem.name, updatedItem.description, updatedItem.price, updatedItem.category);
      const validationErrors = item.validate();
      
      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }
      
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  patch(req, res) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      
      const allowedFields = ['name', 'description', 'price', 'category'];
      const patchData = {};
      
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) {
          patchData[field] = req.body[field];
        }
      });
      
      if (Object.keys(patchData).length === 0) {
        return res.status(400).json({ error: 'No valid fields to patch' });
      }
      
      const patchedItem = db.patch(id, patchData);
      
      if (!patchedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      const item = new (require('../models/Item'))(patchedItem.id, patchedItem.name, patchedItem.description, patchedItem.price, patchedItem.category);
      const validationErrors = item.validate();
      
      if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
      }
      
      res.json(patchedItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  delete(req, res) {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      
      const item = db.findById(id);
      
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      db.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ItemController();