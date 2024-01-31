// import { serve } from './elysia.ts'
import { serve } from './express.ts'

serve({
  port: parseInt(process.env.PORT, 10),
})
