/*
npx sequelize-cli migration:generate --name add-departmentId-to-student_years
npx sequelize-cli db:migrate

*/

const { DataTypes } = require('sequelize');
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('student_years', 'departmentId', {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'departments',
        key: 'id',
      },
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('student_years', 'departmentId');
  },
};
