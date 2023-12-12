import { Model, DataTypes } from "sequelize";

export default class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                role: {
                    type: DataTypes.ENUM(["sitter", "customer"]),
                    allowNull: false,
                    defaultValue: "customer"
                },
                experience: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                },
                type: {
                    type: DataTypes.ENUM(["large", "medium", "small"]),
                    allowNull: true,
                }
            },
            {
                sequelize,
                timestamps: true,
                modelName: "User",
                tableName: "users",
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.User.hasMany(db.Book, { as: "books", foreignKey: "userId", sourceKey: "id" });
        db.User.hasMany(db.Book, { foreignKey: "sitterId", sourceKey: "id" });
        db.User.hasMany(db.Review, { as: "reviews", foreignKey: "userId", sourceKey: "id" });
        db.User.hasMany(db.Review, { foreignKey: "sitterId", sourceKey: "id" });
    }
}
