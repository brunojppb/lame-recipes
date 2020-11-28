import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateRecipe1606562844826 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.createTable(
        new Table({
          name: 'recipe',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'uuid'
            },
            {
              name: 'name',
              type: 'varchar(255)'
            }
          ]
        }),
        true
      );
    } catch (err) {
      console.error('Could not create table: recipes', err);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.dropTable('recipe', true);
    } catch (err) {
      console.error('Could not drop table: recipes', err);
    }
  }
}
