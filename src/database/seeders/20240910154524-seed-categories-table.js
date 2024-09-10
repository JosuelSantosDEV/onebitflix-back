'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Tecnologias Back-end', position: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'Tecnologias Front-end', position: 2, created_at: new Date(), updated_at: new Date() },
      { name: 'Ferramentas de Desenvolvimento', position: 3, created_at: new Date(), updated_at: new Date() },
      { name: 'Soft-skills', position: 4, created_at: new Date(), updated_at: new Date() },
      { name: 'Carreira', position: 5, created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  }
};

// Criar seeders
// npx sequelize-cli seed:generate --name seed-users-table

// Executar seeders
// npx sequelize-cli db:seed:all

// Executar um seed específico
// npx sequelize-cli db:seed --seed src/database/seeders/20240910154524-seed-categories-table.js

// Desfazer o seed (executar o metodo down)
// npx sequelize-cli db:seed:undo:all