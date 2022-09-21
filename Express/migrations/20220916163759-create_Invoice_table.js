'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('Invoices', {
      Invoice_no: {type: Sequelize.STRING(), allowNull: false, primaryKey:true},
      date: {type: Sequelize.DATE, allowNull: false},
      customer_name: {type: Sequelize.STRING(), allowNull: false},
      salesperson_name: {type: Sequelize.STRING(), allowNull: false},
      payment_type: {type: Sequelize.ENUM('CASH', 'CREDIT'), allowNull: false},
      notes: Sequelize.STRING(),      
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
    return queryInterface.dropTable("Invoices")
  }
};
