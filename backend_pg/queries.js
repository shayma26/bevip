const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'brightideas',
  password: 'changeme',
  port: 5432,
})

const getNotes = (req, res) => {
    pool.query('SELECT * FROM notes ORDER BY createdat ASC', (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  };

  const createNote = (req, res) => {
    const { title, content } = req.body;
  
    pool.query(
      'INSERT INTO Notes (title, content) VALUES ($1, $2) RETURNING *',
      [title, content],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(201).send(`Note added with ID: ${results.rows[0].id}`);
      }
    );
  };
  
  const updateNote = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    if(title!=null)
    pool.query(
      'UPDATE Notes SET title = $1 WHERE id = $2',
      [title, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).send(`Note modified with ID: ${id}`);
      }
    );
    if(content!=null)
    pool.query(
        'UPDATE Notes SET content = $1 WHERE id = $2',
        [content, id],
        (error, results) => {
          if (error) {
            throw error;
          }
          res.status(200).send(`Note modified with ID: ${id}`);
        }
      );
  };
  
  const deleteNote = (req, res) => {
    const id = parseInt(req.params.id);
  
    pool.query('DELETE FROM Notes WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`Note deleted with ID: ${id}`);
    });
  };
  
  module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
  };