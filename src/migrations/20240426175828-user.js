/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     */
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        unique: true
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.DataTypes.ENUM('ADMIN', 'USER', 'SELLER'),
        defaultValue: 'USER',
        allowNull: false
      },
      verified: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      imageUrl: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: true
      },
      googleId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      googleToken: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     */
    await queryInterface.dropTable('users');
  }
};