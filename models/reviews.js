import { Model, DataTypes } from "sequelize";

export default class Review extends Model {
	static init(sequelize) {
		return super.init({
			id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			sitterId: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			comment: {
				type: DataTypes.STRING(200),
				allowNull: false
			},
			grade: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
			}
		}, {
			sequelize,
			timestamps: true,
			modelName: "Review",
			tableName: "reviews",
			charset: "utf8",
			collate: "utf8_general_ci",
		});
	}
	
	static associate(db) {
        db.Review.belongsTo(db.User, {as:"user_reviews", foreignKey: "userId", targetKey: "id" });
        db.Review.belongsTo(db.User, {as:"sitter_reviews", foreignKey: "sitterId", targetKey: "id" });
    }
}