'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.createTable('Products', {
      id: {type: Sequelize.INTEGER(), primaryKey: true, allowNull: false, autoIncrement: true},
      Invoice_no: {type: Sequelize.STRING(), allowNull: false},
      item_name: {type: Sequelize.STRING(), allowNull: false},
      quantity: {type: Sequelize.INTEGER(), allowNull: false},
      total_cog: {type: Sequelize.INTEGER(), allowNull: false},
      total_price_sold: {type: Sequelize.INTEGER(), allowNull: false},
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
  })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.dropTable('Products')
  }
};
