import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";

export default async function tasks(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { method } = req;

  switch (method) {
    case "PUT":
      try {
        const { title, description } = req.body;
        const query =
          "UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *";
        const values = [title, description, id];
        const getUser = await conn.query(query, values);
        if (getUser.rows.length === 0)
          return res.json({ error: "Task not found." });
        return res.json(getUser.rows[0]);
      } catch (e: any) {
        return res.status(500).json({ error: e.message });
      }
    case "DELETE":
      try {
        const query = "DELETE FROM tasks WHERE id = $1";
        const values = [id];
        await conn.query(query, values);
        return res.json({ status: "User deleted." });
      } catch (e: any) {
        return res.status(500).json({ error: e.message });
      }
    case "GET":
      try {
        const query = "SELECT * FROM tasks WHERE id = $1";
        const values = [id];
        const getUser = await conn.query(query, values);
        if (getUser.rows.length === 0)
          return res.json({ error: "Task not found." });
        return res.json(getUser.rows[0]);
      } catch (e: any) {
        return res.status(500).json({ error: e.message });
      }
    default:
      return res.status(500).json({ state: "Invalid method." });
  }
}

/*
            const { title, description } = req.body;

        const query =
          "INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *";

        const values = [title, description];

        const userPost = await conn.query(query, values);

        return res.json(userPost);

*/
