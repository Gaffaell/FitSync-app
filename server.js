const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o banco PostgreSQL
const pool = new Pool({
  user: "postgres",          // seu usuário do PostgreSQL
  host: "localhost",         // ou o IP do servidor
  database: "cadastro de aluno", // nome do banco que você criou
  password: "sua_senha",     // sua senha do PostgreSQL
  port: 5432,                // porta padrão
});

// Rota para cadastrar aluno
app.post("/alunos", async (req, res) => {
  const { nome, idade, sexo, altura, peso, telefone, email, senha } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO alunos (nome, idade, sexo, altura, peso, telefone, email, senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [nome, idade, sexo, altura, peso, telefone, email, senha]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para listar alunos
app.get("/alunos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM alunos ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
