import type { MigrationInterface, QueryRunner } from "typeorm";

export class AddedJoinsInVendors1764055589521 implements MigrationInterface {
    name = 'AddedJoinsInVendors1764055589521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_6b00af9e9c38a1673f594de74f4\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`vendorId\` \`vendor_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`vendor_id\` \`vendor_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_0e859a83f1dd6b774c20c02885d\` FOREIGN KEY (\`vendor_id\`) REFERENCES \`vendors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_0e859a83f1dd6b774c20c02885d\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`vendor_id\` \`vendor_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`vendor_id\` \`vendorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_6b00af9e9c38a1673f594de74f4\` FOREIGN KEY (\`vendorId\`) REFERENCES \`vendors\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
