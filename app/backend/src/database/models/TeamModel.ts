import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
// import Matches from './MatchesModel';

export default class Teams extends Model {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(30),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  // modelName: 'teams',
  timestamps: false,
});

// Teams.belongsTo(Matches, { foreignKey: 'id', as: 'homeTeamId' });
// Teams.belongsTo(Matches, { foreignKey: 'id', as: 'awayTeamId' });

// Matches.hasMany(Teams, { foreignKey: 'id', as: 'homeTeamId' });
// Matches.hasMany(Teams, { foreignKey: 'id', as: 'awayTeamId' });
