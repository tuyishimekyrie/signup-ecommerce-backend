'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'roleId', {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUID,
    });
    await queryInterface.changeColumn('users', 'verified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'roleId');
    await queryInterface.changeColumn('users', 'verified', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    });
  }
};
