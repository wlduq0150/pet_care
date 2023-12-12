import { Model, DataTypes } from "sequelize";

export default class Book extends Model {
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
			requirement: {
				type: DataTypes.STRING(100),
				allowNull: false
			},
			date: {
				type: DataTypes.DATE,
				allowNull: false,
			}
		}, {
			sequelize,
			modelName: "Book",
			tableName: "books",
			charset: "utf8",
			collate: "utf8_general_ci",
		});
	}
	
	static associate(db) {
        db.Book.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
        db.Book.belongsTo(db.User, { foreignKey: "sitterId", targetKey: "id" });
    }
}