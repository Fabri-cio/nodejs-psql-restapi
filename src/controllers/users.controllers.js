import { pool } from "../db.js";

export const getUsers = async (req, res) => {
    // const response = await pool.query("SELECT * FROM users ORDER BY id ASC");
    // res.status(200).json(response.rows);
    const { rows } = await pool.query('SELECT * FROM users ORDER BY id ASC') //obtenemos todo de la tabla pero solo rows
    res.json(rows)
}

export const getUser = async (req, res) => {
    // const id = parseInt(req.params.id);
    // const response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    // res.json(response.rows);
    const { id } = req.params //primero obtemos el id de la petecion de {id} osea puede ser 20 si no ponemos asi {id} y en vez result obtendremos un array con varios objetos
    const { rows } = await pool.query('SELECT * FROM users where id = $1', [id]) //luego guardamos el valor 

    if (rows.length === 0) { // es una pregunta si hay una coincidencia osea agarra la propidad rowCount
        return res.status(404).json({ message: "user not found" }) //respondemos con codigo de estado para filanlizr la funcion
    }
    res.json(rows[0])
}

export const createUser = async (req, res) => {
    // try {
    //     const { name, email } = req.body;

    //     const { rows } = await pool.query(
    //         "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    //         [name, email]
    //     );

    //     res.status(201).json(rows[0]);
    // } catch (error) {
    //     return res.status(500).json({ error: error.message });
    // }
    try {
        const data = req.body
        const { rows } = await pool.query('INSERT INTO users (name,email) VALUES ($1, $2) RETURNING *', [data.name, data.email])

        return res.json(rows[0])
    } catch (error) {
        console.log(error)

        if (error?.code === "23505") {
            return res.status(409).json({ message: "Este email ya existe" })
        }

        return res.status(500).json({ message: "error de servidor interno" })
    }

}

export const deleteUser = async (req, res) => {
    // const id = parseInt(req.params.id);
    // const { rowCount } = await pool.query("DELETE FROM users where id = $1", [
    //     id,
    // ]);

    // if (rowCount === 0) {
    //     return res.status(404).json({ message: "User not found" });
    // }

    // return res.sendStatus(204);
    //1 obtenmos el valor del id que queremos eliminar
    const { id } = req.params

    // obtnemos el resultado rowCount
    const { rows, rowCount } = await pool.query('DELETE FROM users where id = $1 RETURNING *', [id])
    console.log(rows[0])

    // condicional en la que 
    if (rowCount === 0) {
        return res.status(404).json({ message: 'user not found' })
    }

    //o tambien podemos poner
    // return res.json(`El usuario ${id} ha sido eliminado de la base de datos`)
    return res.sendStatus(204) //el servidor a procesado con exito la solicitud pero no va a devolver ningun contenido
}

export const updateUser = async (req, res) => {
    // const id = parseInt(req.params.id);
    // const { name, email } = req.body;

    // const { rows } = await pool.query(
    //   "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    //   [name, email, id]
    // );

    // return res.json(rows[0]);
    const { id } = req.params
    const { name, email } = req.body

    const { rows } = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *   ', [name, email, id])

    return res.send(rows[0])
}

