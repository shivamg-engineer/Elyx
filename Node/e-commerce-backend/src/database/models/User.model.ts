// src/database/models/User.model.ts
import { Model, DataTypes,type Optional, Sequelize } from 'sequelize';

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string; // Hashed password
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public declare id: number;
    public declare name: string;
    public declare email: string;
    public declare phone: string;
    public declare password: string;
    public declare address: string;

    public declare readonly createdAt: Date;
    public declare readonly updatedAt: Date;

    public static initialize(sequelize: Sequelize): void {
        User.init({
            id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING(100), allowNull: false },
            email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
            phone: { type: DataTypes.STRING(20), allowNull: true },
            password: { type: DataTypes.STRING(255), allowNull: false },
            address: { type: DataTypes.TEXT, allowNull: false },
        }, {
            tableName: 'users',
            sequelize,
            underscored: true,
        });
    }
}