import Sequelize from "sequelize";
import * as configEX from "../config/config.js";
import User from "./users.js";
import Book from "./books.js";
import Review from "./reviews.js";

const env = process.env.NODE_ENV || "development";
const config = configEX[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

db.User = User;
db.Book = Book;
db.Review = Review;

User.init(sequelize);
Book.init(sequelize);
Review.init(sequelize);

User.associate(db);
Book.associate(db);
Review.associate(db);

export { db };
