const axios = require('axios');

const BASE_URL = 'http://localhost:3000';
const API_URL = `${BASE_URL}/api/items`;

let createdItemId = null;

const logResponse = (title, response) => {
  console.log(`\n========== ${title} ==========`);
  console.log(`Status: ${response.status}`);
  console.log('Response:', JSON.stringify(response.data, null, 2));
};

const logError = (title, error) => {
  console.log(`\n========== ${title} ==========`);
  if (error.response) {
    console.log(`Status: ${error.response.status}`);
    console.log('Error:', JSON.stringify(error.response.data, null, 2));
  } else if (error.code === 'ECONNREFUSED') {
    console.log('Error: Cannot connect to server. Make sure the server is running on port 3000');
  } else {
    console.log('Error:', error.message);
  }
};

const testServerHealth = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/items?page=1&limit=1`);
    console.log('Server is running and responding');
    return true;
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      console.log('ERROR: Server is not running on port 3000');
      console.log('Please start the server first by running: node server.js');
    } else if (error.response) {
      console.log('Server is reachable');
      return true;
    } else {
      console.log('Server connection failed:', error.message);
    }
    return false;
  }
};

const testCreateItem = async () => {
  try {
    const newItem = {
      name: 'Gaming Mouse',
      description: 'RGB gaming mouse with 6 buttons',
      price: 150,
      category: 'electronics'
    };
    
    const response = await axios.post(API_URL, newItem);
    logResponse('POST /api/items - Create Item', response);
    createdItemId = response.data.id;
    return true;
  } catch (error) {
    logError('POST /api/items - Create Item', error);
    return false;
  }
};

const testCreateItemValidation = async () => {
  try {
    const invalidItem = {
      name: '',
      price: -10,
      category: ''
    };
    
    const response = await axios.post(API_URL, invalidItem);
    logResponse('POST /api/items - Create Invalid Item (Should Fail)', response);
    return false;
  } catch (error) {
    logError('POST /api/items - Create Invalid Item (Expected Failure)', error);
    return true;
  }
};

const testGetAllItems = async () => {
  try {
    const response = await axios.get(API_URL);
    logResponse('GET /api/items - Get All Items (Default Pagination)', response);
    return true;
  } catch (error) {
    logError('GET /api/items - Get All Items', error);
    return false;
  }
};

const testGetItemsPaginated = async () => {
  try {
    const response = await axios.get(`${API_URL}?page=1&limit=5&sortBy=price&order=desc`);
    logResponse('GET /api/items?page=1&limit=5&sortBy=price&order=desc - Paginated', response);
    return true;
  } catch (error) {
    logError('GET /api/items with Pagination', error);
    return false;
  }
};

const testGetItemById = async () => {
  if (!createdItemId) {
    console.log('\n========== GET /api/items/:id - Skip (No item created) ==========');
    return false;
  }
  
  try {
    const response = await axios.get(`${API_URL}/${createdItemId}`);
    logResponse(`GET /api/items/${createdItemId} - Get Item By ID`, response);
    return true;
  } catch (error) {
    logError('GET /api/items/:id - Get Item By ID', error);
    return false;
  }
};

const testGetItemByIdNotFound = async () => {
  try {
    const response = await axios.get(`${API_URL}/9999`);
    logResponse('GET /api/items/9999 - Get Non-existent Item (Should Fail)', response);
    return false;
  } catch (error) {
    logError('GET /api/items/9999 - Get Non-existent Item (Expected Failure)', error);
    return true;
  }
};

const testUpdateItem = async () => {
  if (!createdItemId) {
    console.log('\n========== PUT /api/items/:id - Skip (No item created) ==========');
    return false;
  }
  
  try {
    const updatedItem = {
      name: 'Gaming Mouse Pro',
      description: 'Wireless RGB gaming mouse with 8 buttons',
      price: 200,
      category: 'electronics'
    };
    
    const response = await axios.put(`${API_URL}/${createdItemId}`, updatedItem);
    logResponse(`PUT /api/items/${createdItemId} - Update Entire Item`, response);
    return true;
  } catch (error) {
    logError('PUT /api/items/:id - Update Item', error);
    return false;
  }
};

const testUpdateItemNotFound = async () => {
  try {
    const updatedItem = {
      name: 'Test Item',
      price: 100
    };
    
    const response = await axios.put(`${API_URL}/9999`, updatedItem);
    logResponse('PUT /api/items/9999 - Update Non-existent Item (Should Fail)', response);
    return false;
  } catch (error) {
    logError('PUT /api/items/9999 - Update Non-existent Item (Expected Failure)', error);
    return true;
  }
};

const testPatchItem = async () => {
  if (!createdItemId) {
    console.log('\n========== PATCH /api/items/:id - Skip (No item created) ==========');
    return false;
  }
  
  try {
    const partialUpdate = {
      price: 180
    };
    
    const response = await axios.patch(`${API_URL}/${createdItemId}`, partialUpdate);
    logResponse(`PATCH /api/items/${createdItemId} - Update Single Field (Price)`, response);
    return true;
  } catch (error) {
    logError('PATCH /api/items/:id - Patch Item', error);
    return false;
  }
};

const testPatchItemMultipleFields = async () => {
  if (!createdItemId) {
    console.log('\n========== PATCH /api/items/:id - Skip (No item created) ==========');
    return false;
  }
  
  try {
    const partialUpdate = {
      description: 'Limited edition wireless gaming mouse',
      category: 'gaming'
    };
    
    const response = await axios.patch(`${API_URL}/${createdItemId}`, partialUpdate);
    logResponse(`PATCH /api/items/${createdItemId} - Update Multiple Fields`, response);
    return true;
  } catch (error) {
    logError('PATCH /api/items/:id - Patch Multiple Fields', error);
    return false;
  }
};

const testPatchItemNotFound = async () => {
  try {
    const partialUpdate = {
      name: 'Updated Name'
    };
    
    const response = await axios.patch(`${API_URL}/9999`, partialUpdate);
    logResponse('PATCH /api/items/9999 - Patch Non-existent Item (Should Fail)', response);
    return false;
  } catch (error) {
    logError('PATCH /api/items/9999 - Patch Non-existent Item (Expected Failure)', error);
    return true;
  }
};

const testDeleteItem = async () => {
  if (!createdItemId) {
    console.log('\n========== DELETE /api/items/:id - Skip (No item created) ==========');
    return false;
  }
  
  try {
    const response = await axios.delete(`${API_URL}/${createdItemId}`);
    console.log(`\n========== DELETE /api/items/${createdItemId} - Delete Item ==========`);
    console.log(`Status: ${response.status}`);
    console.log('Response: Item successfully deleted');
    return true;
  } catch (error) {
    logError('DELETE /api/items/:id - Delete Item', error);
    return false;
  }
};

const testDeleteItemNotFound = async () => {
  try {
    const response = await axios.delete(`${API_URL}/9999`);
    logResponse('DELETE /api/items/9999 - Delete Non-existent Item (Should Fail)', response);
    return false;
  } catch (error) {
    logError('DELETE /api/items/9999 - Delete Non-existent Item (Expected Failure)', error);
    return true;
  }
};

const testGetAfterDelete = async () => {
  if (!createdItemId) {
    console.log('\n========== Verify Deletion - Skip (No item created) ==========');
    return false;
  }
  
  try {
    const response = await axios.get(`${API_URL}/${createdItemId}`);
    logResponse(`GET /api/items/${createdItemId} - Verify Item No Longer Exists (Should Fail)`, response);
    return false;
  } catch (error) {
    logError('GET /api/items/:id - Verify Deletion (Expected Failure)', error);
    return true;
  }
};

const runAllTests = async () => {
  console.log('Starting API Tests...');
  console.log(`Base URL: ${BASE_URL}`);
  console.log('Press Ctrl+C to stop tests\n');
  
  const isServerRunning = await testServerHealth();
  if (!isServerRunning) {
    console.log('\nMake sure to:');
    console.log('1. Install dependencies: npm install');
    console.log('2. Start the server: node server.js');
    console.log('3. Run tests in another terminal: npm test');
    return;
  }
  
  const results = [];
  
  results.push({ name: 'Create Item', passed: await testCreateItem() });
  results.push({ name: 'Create Item Validation', passed: await testCreateItemValidation() });
  results.push({ name: 'Get All Items', passed: await testGetAllItems() });
  results.push({ name: 'Get Items Paginated', passed: await testGetItemsPaginated() });
  results.push({ name: 'Get Item By ID', passed: await testGetItemById() });
  results.push({ name: 'Get Item By ID Not Found', passed: await testGetItemByIdNotFound() });
  results.push({ name: 'Update Entire Item', passed: await testUpdateItem() });
  results.push({ name: 'Update Item Not Found', passed: await testUpdateItemNotFound() });
  results.push({ name: 'Patch Single Field', passed: await testPatchItem() });
  results.push({ name: 'Patch Multiple Fields', passed: await testPatchItemMultipleFields() });
  results.push({ name: 'Patch Item Not Found', passed: await testPatchItemNotFound() });
  results.push({ name: 'Delete Item', passed: await testDeleteItem() });
  results.push({ name: 'Delete Item Not Found', passed: await testDeleteItemNotFound() });
  results.push({ name: 'Verify Deletion', passed: await testGetAfterDelete() });
  
  console.log('\n\n****************************************************************');
  console.log('TEST RESULTS SUMMARY');
  console.log('****************************************************************');
  
  let passedCount = 0;
  results.forEach(result => {
    const status = result.passed ? 'PASSED' : 'FAILED';
    if (result.passed) passedCount++;
    console.log(`${status}: ${result.name}`);
  });
  
  console.log('****************************************************************');
  console.log(`Total: ${passedCount}/${results.length} tests passed`);
  if (passedCount === results.length) {
    console.log('SUCCESS: All tests passed!');
  } else {
    console.log(`WARNING: ${results.length - passedCount} test(s) failed`);
  }
  console.log('****************************************************************\n');
};

runAllTests();