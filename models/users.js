'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    uname: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Users.associate = function (models) {
    // associations can be defined here
  };
  return Users;
};