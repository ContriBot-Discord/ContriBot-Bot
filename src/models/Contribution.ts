import {DataTypes, Sequelize} from "sequelize";

module.exports = (sequelize: Sequelize) => {
    return sequelize.define(
        "users",
        {
            userId: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
            },
            contributionPoint: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            allContributionPoint: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            lang: {
                type: DataTypes.CHAR(2),
                allowNull: false,
                defaultValue: 'fr'
            }
        },
        {timestamps: false}
    );
};
