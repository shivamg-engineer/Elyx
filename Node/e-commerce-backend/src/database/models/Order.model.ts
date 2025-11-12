// src/database/models/Order.model.ts
import { Model, DataTypes,type Optional, Sequelize } from 'sequelize';

// Use a simple array for the allowed status values
export const ORDER_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const;
type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderAttributes {
    id: number;
    userId: number;
    productId: number;
    quantity: number;
    totalAmount: number;
    status: OrderStatus;
    paymentMethod: 'COD'; // Fixed to 'COD'
    shippingAddress: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'status' | 'paymentMethod' | 'createdAt' | 'updatedAt'> {}

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public declare id: number;
    public declare userId: number;
    public declare productId: number;
    public declare quantity: number;
    public declare totalAmount: number;
    public declare status: OrderStatus;
    public declare paymentMethod: 'COD';
    public declare shippingAddress: string;

    public declare readonly createdAt: Date;
    public declare readonly updatedAt: Date;

    public static initialize(sequelize: Sequelize): void {
        Order.init({
            id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'user_id' },
            productId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, field: 'product_id' },
            quantity: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
            totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: 'total_amount' },
            status: { type: DataTypes.ENUM(...ORDER_STATUSES), allowNull: false, defaultValue: 'pending' },
            paymentMethod: { type: DataTypes.ENUM('COD'), allowNull: false, defaultValue: 'COD', field: 'payment_method' },
            shippingAddress: { type: DataTypes.TEXT, allowNull: false, field: 'shipping_address' },
        }, {
            tableName: 'orders',
            sequelize,
            underscored: true,
        });
    }
}