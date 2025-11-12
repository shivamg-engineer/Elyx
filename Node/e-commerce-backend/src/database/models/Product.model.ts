import { Model, DataTypes,type Optional, Sequelize } from 'sequelize';
import { Vendor } from './Vendor.model'; // Assuming this model exists
import { Order } from './Order.model';
import { Cart } from './Cart.model';
import { Wishlist } from './Wishlist.model';

// --- 1. Define Attributes Interface ---
export interface ProductAttributes {
    id: number;
    vendorId: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: string;
    imageUrl: string;
    // Sequelize managed timestamps/soft delete fields
    deletedAt?: Date | null; 
    createdAt?: Date;
    updatedAt?: Date;
}

// --- 2. Define Creation Attributes ---
// Makes 'id', timestamps, and deletedAt optional during model creation
export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'deletedAt' | 'createdAt' | 'updatedAt'> {}

// --- 3. Define the Model Class ---
export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    // Public instance properties (must match ProductAttributes)
    public declare id: number;
    public declare vendorId: number;
    public declare name: string;
    public declare description: string;
    public declare price: number;
    public declare stockQuantity: number;
    public declare category: string;
    public declare imageUrl: string;

    // Soft delete and Timestamps
    public declare deletedAt: Date | null; 
    public declare readonly createdAt: Date;
    public declare readonly updatedAt: Date;

    // Association properties (for eager loading/includes)
    public declare vendor?: Vendor;
    public declare orders?: Order[];
    public declare cartItems?: Cart[];
    public declare wishlistItems?: Wishlist[];


    // --- 4. Initialization Method (Schema Definition) ---
    public static initialize(sequelize: Sequelize): void {
        Product.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            vendorId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                field: 'vendor_id',
            },
            name: { type: DataTypes.STRING(255), allowNull: false },
            description: { type: DataTypes.TEXT, allowNull: true },
            price: { 
                type: DataTypes.DECIMAL(10, 2), 
                allowNull: false, 
                defaultValue: 0 
            },
            stockQuantity: { 
                type: DataTypes.INTEGER.UNSIGNED, 
                allowNull: false, 
                defaultValue: 0, 
                field: 'stock_quantity' 
            },
            category: { type: DataTypes.STRING(100), allowNull: false },
            imageUrl: { type: DataTypes.STRING(500), allowNull: true, field: 'image_url' },
        }, {
            tableName: 'products',
            sequelize,
            paranoid: true, // Enables soft delete using 'deletedAt'
            underscored: true, // Uses snake_case for column names
        });
    }

    // --- 5. Association Method ---
    public static associate(models: any): void {
        // A Product belongs to one Vendor
        Product.belongsTo(models.Vendor, { foreignKey: 'vendorId', as: 'vendor' });
        
        // A Product can be in many Orders
        Product.hasMany(models.Order, { foreignKey: 'productId', as: 'orders' });
        
        // A Product can be in many Carts (Cart Items)
        Product.hasMany(models.Cart, { foreignKey: 'productId', as: 'cartItems' });
        
        // A Product can be in many Wishlists
        Product.hasMany(models.Wishlist, { foreignKey: 'productId', as: 'wishlistItems' });
    }
}