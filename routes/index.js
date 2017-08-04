const pg = require('pg');
const pgHstore = require('pghstore');
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistackdb');
