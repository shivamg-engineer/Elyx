import { Model,  DataTypes, type Optional, Sequelize } from "sequelize";
import { Product } from "./Product.model.ts";

export interface VendorAttributes {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string; // Hashed password
    storeName: string;
    gstin: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface VendorCreationAttributes extends Optional<VendorAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Vendor extends Model<VendorAttributes, VendorCreationAttributes> implements VendorAttributes {
    public declare id: number;
    public declare name: string;
    public declare email: string;
    public declare phone: string;
    public declare password: string;
    public declare storeName: string;
    public declare gstin: string;

    public declare readonly createdAt: Date;
    public declare readonly updatedAt: Date;

    // Association placeholder
    public declare products?: Product[];

    public static initialize(sequelize: Sequelize): void {
        Vendor.init({
            id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
            name: { type: DataTypes.STRING(100), allowNull: false },
            email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
            phone: { type: DataTypes.STRING(20), allowNull: true },
            password: { type: DataTypes.STRING(255), allowNull: false },
            storeName: { type: DataTypes.STRING(100), allowNull: false, field: 'store_name' },
            gstin: { type: DataTypes.STRING(15), allowNull: false },
        }, {
            tableName: 'vendors',
            sequelize,
            underscored: true,
        });
    }

    public static associate(models: any): void {
        Vendor.hasMany(models.Product, { foreignKey: 'vendorId', as: 'products' });
    }
}