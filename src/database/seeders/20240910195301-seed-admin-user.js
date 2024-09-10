'use strict';

const bcrypt = require("bcrypt");
const { where } = require("sequelize/lib/sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    // creando password criptografada para user admin padrão
    const hashedPassword = await bcrypt.hash("12345678", 10);

    await queryInterface.bulkInsert("users", [{
        first_name: 'Admin',
        last_name: 'User',
        phone: '555-5555',
        birth: '1990-01-01',
        email: 'admin@email.com',
        password: hashedPassword,
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
    }])

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {where: {email: "admin@email.com"}});
  }
};
