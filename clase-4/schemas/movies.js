import z from 'zod'
const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie Title must be a string',
    required_error: 'Movie Title is required'
  }),
  year: z.number().int().min(1895).max(2025),
  director: z.string().nonempty(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).optional().default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller', 'Western', 'Animation', 'Documentary', 'Science Fiction', 'Crime', 'Adventure', 'Family', 'Romance', 'War', 'Music', 'History', 'TV Movie', 'Foreign']),
    {
      required_error: 'Movie Genre is required',
      invalid_type_error: 'Movie Genre must be an array of enum Genre'
    }
  )
})

export function validateMovie (object) {
  return movieSchema.safeParse(object)
}

export function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}
