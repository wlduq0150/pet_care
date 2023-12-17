"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("reviews", "bookId", {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: "books",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        });

        const reviews = await queryInterface.sequelize.query(
          'SELECT id, userId, sitterId FROM reviews', // 기존 데이터베이스에서 데이터 가져오기
          { type: Sequelize.QueryTypes.SELECT }
        );
    
        for (const review of reviews) {
          const bookId = await queryInterface.sequelize.query(
            'SELECT id FROM books WHERE userId = :userId AND sitterId = :sitterId LIMIT 1',
            {
              replacements: { userId: review.userId, sitterId: review.sitterId },
              type: Sequelize.QueryTypes.SELECT,
            }
          );
    
          if (bookId.length > 0) {
            await queryInterface.sequelize.query(
              'UPDATE reviews SET bookId = :bookId WHERE id = :reviewId',
              {
                replacements: { bookId: bookId[0].id, reviewId: review.id },
                type: Sequelize.QueryTypes.UPDATE,
              }
            );
          }
        }
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
