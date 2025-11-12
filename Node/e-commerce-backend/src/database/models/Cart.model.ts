// src/database/models/Cart.model.ts
import { Model, DataTypes,type Optional, Sequelize } from 'sequelize';

export interface CartAttributes {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    addedAt?: Date; // Used instead of createdAt for cart time tracking
    isAbandoned: boolean;
    deletedAt?: Date | null;
    updatedAt?: Date;
}
export interface CartCreationAttributes extends Optional<CartAttributes, 'id' | 'addedAt' | 'isAbandoned' | 'deletedAt' | 'updatedAt'> {}

export class Cart extends Model<CartAttributes, CartCreationAttributes> implements CartAttributes {
    public declare id: number;
    public declare userId: number;
    public declare productId: number;
    public declare quantity: number;
    public declare addedAt: Date;
    public declare isAbandoned: boolean;
    public declare deletedAt: Date | null;

    public declare readonly updatedAt: Date;

    public static initialize(sequelize: Sequelize): void {
        Cart.init({
            id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'user_id' },
            productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'product_id' },
            quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
            addedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW, field: 'added_at' },
            isAbandoned: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_abandoned' },
        }, {
            tableName: 'carts',
            sequelize,
            paranoid: true, // IMPORTANT: Enables soft delete using deletedAt
            timestamps: false, // Exclude Sequelize's default createdAt/updatedAt
            updatedAt: true, // Manually enable just the updatedAt column (as per metadata)
            createdAt: false, 
            deletedAt: 'deleted_at', // Map to the snake_case column
        });
    }
}