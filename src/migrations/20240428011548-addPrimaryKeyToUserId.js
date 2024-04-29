'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add userId column with a default UUID value for existing rows
    await queryInterface.addColumn('users', 'userId', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    });

    // Update existing rows to set a default UUID value for userId
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "userId" = uuid_generate_v4() WHERE "userId" IS NULL`
    );

    // Alter column to set NOT NULL constraint
    await queryInterface.changeColumn('users', 'userId', {
      type: Sequelize.UUID,
      allowNull: false
    });

    // Add userId as primary key
    await queryInterface.addConstraint('users', {
      type: 'primary key',
      fields: ['userId']
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('users', 'Users_pkey');
    await queryInterface.removeColumn('users', 'userId');
  }
};