module.exports = {
    development:{
        dialect: "postgres",
        host: "localhost",
        port: "5432",
        database: "onebitflix_development",
        username: "onebitflix",
        password: "onebitflix"
    }

}

// Comando para criar banco de dados:
// npx sequelize-cli db:create
// npx sequelize-cli db:drop  // Apaga banco