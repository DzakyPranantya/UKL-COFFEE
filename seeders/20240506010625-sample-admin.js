'use strict';

const now = new Date()
const md5 = require('md5');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('admins', [
      { 
        name: "admin",
        email: "admin@gmail.com", 
        password: md5("admin123"),
        createdAt : now, 
        updatedAt : now 
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('admins', null, {});
  }
};