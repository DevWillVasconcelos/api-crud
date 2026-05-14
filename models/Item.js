// models/Item.js
class Item {
  constructor(id, name, description, price, category, createdAt) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.createdAt = createdAt || new Date().toISOString();
  }

  validate() {
    const errors = [];
    
    if (!this.name || typeof this.name !== 'string' || this.name.trim().length === 0) {
      errors.push('Name is required and must be a non-empty string');
    }
    
    if (this.description && typeof this.description !== 'string') {
      errors.push('Description must be a string');
    }
    
    if (typeof this.price !== 'number' || this.price < 0) {
      errors.push('Price must be a positive number');
    }
    
    if (!this.category || typeof this.category !== 'string') {
      errors.push('Category is required and must be a string');
    }
    
    return errors;
  }

  updateFromData(data) {
    if (data.name !== undefined) this.name = data.name;
    if (data.description !== undefined) this.description = data.description;
    if (data.price !== undefined) this.price = data.price;
    if (data.category !== undefined) this.category = data.category;
  }
}

module.exports = Item;