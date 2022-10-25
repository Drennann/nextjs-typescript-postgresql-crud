import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../utils/database";

export default async function tasks(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      try {
        const userGet = await conn.query("SELECT * from tasks");
        return res.json(userGet.rows);
      } catch (e: any) {
        return res.json({ error: e.message });
      }

    case "POST":
      try {
        const { title, description } = req.body;

        const query =
          "INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *";

        const values = [title, description];

        const userPost = await conn.query(query, values);

        return res.json(userPost);
      } catch (e: any) {
        return res.status(500).json({ error: e.message });
      }

    default:
      return res.status(500).json({ state: "Invalid method." });
  }
}
