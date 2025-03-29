import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      // get genre id from database table using the genre names
      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )

      if (genres.length === 0) return []

      // get the id from the first genre result
      const [{ id }] = genres

      // get all movies ids from database table
      // la query a movie_genres
      // join
      // y devolver resultados..
      const [movies] = await connection.query(
        `SELECT 
           BIN_TO_UUID(m.id) AS id,
           m.title, 
           m.year, 
           m.director, 
           m.duration, 
           m.poster, 
           m.rate 
         FROM movie m
         JOIN movie_genres mg 
         ON m.id = mg.movie_id
         WHERE mg.genre_id = ?;`,
        [id]
      )
      return movies
    }

    const [movies] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie;'
    )
    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
      FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (movies.length === 0) return null

    return movies[0]
  }

  static async create ({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = input

    // Generar UUID para la película
    const [uuidResult] = await connection.query('SELECT UUID() AS id')
    const [{ id: uuid }] = uuidResult

    try {
      // Insertar película en la base de datos
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate) 
            VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
        [uuid, title, year, director, duration, poster, rate]
      )

      // Obtener el ID del género desde la base de datos
      const [genreResult] = await connection.query(
        'SELECT id FROM genre WHERE LOWER(name) = LOWER(?);',
        [genreInput]
      )

      let genreId

      if (genreResult.length === 0) {
        // Si el género no existe, crearlo
        const [newGenre] = await connection.query(
          'INSERT INTO genre (name) VALUES (?)',
          [genreInput]
        )
        genreId = newGenre.insertId
      } else {
        genreId = genreResult[0].id
      }

      // Insertar la relación en movie_genres
      await connection.query(
        'INSERT INTO movie_genres (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?);',
        [uuid, genreId]
      )
    } catch (e) {
      throw new Error('Error creating movie')
    }

    // Obtener y retornar la película insertada
    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
      FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )
    return movies[0]
  }

  static async delete ({ id }) {
    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (movies.length === 0) return null

    const [{ id: movieId }] = movies

    await connection.query('DELETE FROM movie WHERE id = UUID_TO_BIN(?);', [
      movieId
    ])

    return movies[0]
  }

  static async update ({ id, input }) {
    const { title, year, director, duration, poster, rate } = input

    // Construir la query de forma dinámica, excluyendo valores undefined o null
    const fields = []
    const values = []

    if (title) {
      fields.push('title = ?')
      values.push(title)
    }
    if (year) {
      fields.push('year = ?')
      values.push(year)
    }
    if (director) {
      fields.push('director = ?')
      values.push(director)
    }
    if (duration) {
      fields.push('duration = ?')
      values.push(duration)
    }
    if (poster) {
      fields.push('poster = ?')
      values.push(poster)
    }
    if (rate) {
      fields.push('rate = ?')
      values.push(rate)
    }

    // Si no hay campos para actualizar, devolver null
    if (fields.length === 0) return null

    values.push(id) // Agregar el ID para la condición WHERE
    const query = `UPDATE movie SET ${fields.join(
      ', '
    )} WHERE id = UUID_TO_BIN(?)`

    try {
      await connection.query(query, values)
    } catch (e) {
      throw new Error('Error updating movie')
    }

    // Retornar la película actualizada
    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    return movies[0]
  }
}
