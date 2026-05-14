const Item = require('../models/Item');

class InMemoryDatabase {
  constructor() {
    this.items = new Map();
    this.currentId = 1;
    this.initializeSampleData();
  }

  initializeSampleData() {
    const sampleItems = [
      { name: 'Notebook', description: 'High performance laptop', price: 3500, category: 'electronics' },
      { name: 'Coffee Mug', description: 'Ceramic coffee mug', price: 25, category: 'kitchen' },
      { name: 'Desk Chair', description: 'Ergonomic office chair', price: 800, category: 'furniture' }
    ];

    sampleItems.forEach(item => {
      this.create(item);
    });
  }

  create(itemData) {
    const id = this.currentId++;
    const item = new Item(id, itemData.name, itemData.description, itemData.price, itemData.category);
    this.items.set(id, item);
    return item;
  }

  findAll() {
    return Array.from(this.items.values());
  }

  findById(id) {
    return this.items.get(id);
  }

  update(id, itemData) {
    const existingItem = this.items.get(id);
    if (!existingItem) return null;
    
    if (itemData.name !== undefined) existingItem.name = itemData.name;
    if (itemData.description !== undefined) existingItem.description = itemData.description;
    if (itemData.price !== undefined) existingItem.price = itemData.price;
    if (itemData.category !== undefined) existingItem.category = itemData.category;
    
    this.items.set(id, existingItem);
    return existingItem;
  }

  patch(id, partialData) {
    const existingItem = this.items.get(id);
    if (!existingItem) return null;
    
    if (partialData.name !== undefined) existingItem.name = partialData.name;
    if (partialData.description !== undefined) existingItem.description = partialData.description;
    if (partialData.price !== undefined) existingItem.price = partialData.price;
    if (partialData.category !== undefined) existingItem.category = partialData.category;
    
    this.items.set(id, existingItem);
    return existingItem;
  }

  delete(id) {
    return this.items.delete(id);
  }

  findPaginated(page, limit, sortBy = 'id', order = 'asc') {
    const allItems = this.findAll();
    
    const sortedItems = [...allItems].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedItems = sortedItems.slice(startIndex, endIndex);
    
    return {
      data: paginatedItems,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: allItems.length,
        totalPages: Math.ceil(allItems.length / limit),
        hasNextPage: endIndex < allItems.length,
        hasPrevPage: startIndex > 0
      }
    };
  }
}

const db = new InMemoryDatabase();
module.exports = db;