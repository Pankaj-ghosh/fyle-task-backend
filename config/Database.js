const { Client } = require("pg");

const client = new Client({
  user: 'u3iw9c9vcmywlaxxz5ml',
  host: 'b0xp9yjcyyaq6hlyjhj2-postgresql.services.clever-cloud.com',
  database: 'b0xp9yjcyyaq6hlyjhj2',
  password: '7UR0KABwYmYVHlXL9G0j',
  port: '5432'
});

client.on("connect", () => {
  console.log("Clever Cloud PSQL DB connection successful");
});

client.on("end", () => {
  console.log("Clever Cloud PSQL DB connection has terminaed");
});

module.exports = client;
