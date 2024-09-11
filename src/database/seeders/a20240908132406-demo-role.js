"use strict";
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const roles = [
      { name: "Farmer", id: 1 },
      { name: "Logistics", id: 2 },
      { name: "Commodity Broker", id: 3 },
      { name: "FMCG Buyer", id: 4 },
      { name: "Admin", id: 5 }
    ].map(role => ({
      id: role.id,
      name: role.name,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert("Roles", roles, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
