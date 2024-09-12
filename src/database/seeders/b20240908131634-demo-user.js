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
    const adminRoleId = 5;
    const hashedPassword = await hashPassword("Test@123");

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "Jabo Admin",
          userName: "Jabo",
          phoneNumber: "1234567890",
          companyName: "Admin Company",
          companyAddress: "Admin Address",
          companyType: "Administration",
          companyCategory: "Management",
          email: "jabo@gmail.com",
          password: hashedPassword,
          roleId: adminRoleId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          fullName: "Aphrodis Admin",
          userName: "aphrodis",
          phoneNumber: "0987654321",
          companyName: "Admin Company",
          companyAddress: "Admin Address",
          companyType: "Administration",
          companyCategory: "Management",
          email: "aphrodis@gmail.com",
          password: hashedPassword,
          roleId: adminRoleId,
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