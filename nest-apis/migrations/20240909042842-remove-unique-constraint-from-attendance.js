'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the constraint exists before trying to remove it
    const constraints = await queryInterface.showConstraint('attendance');


    await queryInterface.removeConstraint(
      'attendance',
      'attendance_student_id_lecture_id',
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('attendance', {
      fields: ['studentId', 'lectureId'],
      type: 'unique',
      name: 'attendance_student_id_lecture_id',
    });
  }
};
