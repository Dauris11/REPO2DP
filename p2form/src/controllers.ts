import { Request, Response } from "express";
import pool from "./db";

export const getUsuarios = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export const addUsuario = async (req: Request, res: Response) => {
  const { nombre, apellido, direccion, telefono, edad, correo } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO usuarios (nombre, apellido, direccion, telefono, edad, correo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [nombre, apellido, direccion, telefono, edad, correo]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar usuario" });
  }
};
