
exports.up = function(knex) {
    return knex.schema.createTable('relation_users', function(table){
        table.integer('user1_id').notNullable();
        table.integer('user2_id').notNullable();

        table.foreign('user1_id').references('id').inTable('users');
        table.foreign('user2_id').references('id').inTable('users');
    })
};

exports.down = function(knex) {
    knex.schema.dropTable(relation_users);
};