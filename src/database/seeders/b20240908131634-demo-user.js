"use strict";
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const hashedPassword = await hashPassword("Test@123");

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Jabo",
          lastName: "Admin",
          companyName: "Admin Company",
          companyAddress: "Admin Address",
          companyCategory: "Management",
          position: "Administrator",
          email: "jabo@gmail.com",
          password: hashedPassword,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Aphrodis",
          lastName: "Admin",
          companyName: "Admin Company",
          companyAddress: "Admin Address",
          companyCategory: "Management",
          position: "Administrator",
          email: "aphrodis@gmail.com",
          password: hashedPassword,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};