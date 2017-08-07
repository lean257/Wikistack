const pg = require('pg');
//const pghstore = require('pg-hstore');
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistackdb', {
  logging: false
});

var Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    route: () => `/wiki/${this.urlTitle}`
});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
    }
});


module.exports = {
  Page: Page,
  User: User,
  db: db
};

