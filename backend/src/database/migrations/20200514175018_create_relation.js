
exports.up = function(knex) {
    return knex.schema.createTable('book_users', function(table){
        table.integer('user_id').notNullable();
        table.integer('book_id').notNullable();

        table.foreign('user_id').references('id').inTable('users');
        table.foreign('book_id').references('id').inTable('books');
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('book_users');
};