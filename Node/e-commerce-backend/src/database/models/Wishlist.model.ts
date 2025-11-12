// src/database/models/Wishlist.model.ts
import { Model, DataTypes,type Optional, Sequelize } from 'sequelize';

export interface WishlistAttributes {
    id: number;
    userId: number;
    productId: number;
    createdAt?: Date;
}
export interface WishlistCreationAttributes extends Optional<WishlistAttributes, 'id' | 'createdAt'> {}

export class Wishlist extends Model<WishlistAttributes, WishlistCreationAttributes> implements WishlistAttributes {
    public declare id: number;
    public declare userId: number;
    public declare productId: number;

    public declare readonly createdAt: Date;

    public static initialize(sequelize: Sequelize): void {
        Wishlist.init({
            id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'user_id' },
            productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'product_id' },
        }, {
            tableName: 'wishlists',
            sequelize,
            underscored: true,
            timestamps: true, // Only for createdAt in this case, updatedAt is excluded by default settings
            updatedAt: false, // Ensure only createdAt is generated
            indexes: [
                // REQUIRED: Prevents duplicate entries per user-product
                { unique: true, fields: ['user_id', 'product_id'] }
            ]
        });
    }
}