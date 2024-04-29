'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'userId', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    });

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "userId" = uuid_generate_v4() WHERE "userId" IS NULL`
    );

    await queryInterface.changeColumn('users', 'userId', {
      type: Sequelize.UUID,
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'userId');
  }
};
