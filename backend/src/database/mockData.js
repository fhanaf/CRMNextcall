// src/database/mockData.js
const customers = [
  {
    id: 'cust-001',
    name: 'Budi Santoso',
    probabilityScore: 0.95,
    status: 'hot',
    contacted: false,
    demographics: { age: 35, city: 'Jakarta' }
  },
  {
    id: 'cust-002',
    name: 'Siti Aminah',
    probabilityScore: 0.45,
    status: 'cold',
    contacted: true,
    demographics: { age: 24, city: 'Bandung' }
  },
  {
    id: 'cust-003',
    name: 'Andi Pratama',
    probabilityScore: 0.88,
    status: 'warm',
    contacted: false,
    demographics: { age: 40, city: 'Surabaya' }
  }
];

const users = [
  {
    id: 'sales-01',
    username: 'sales1',
    password: 'password123',
    name: 'Sales Agent Satu'
  }
];

module.exports = { customers, users };