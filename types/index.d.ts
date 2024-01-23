import { z } from "zod"

const envVariables = z.object({
  FETCCH_API_KEY: z.string(),
  FETCCH_BASE_URL: z.string().url(),
})

envVariables.parse(process.env)

declare global {
  namespace NodeJS {
    export interface ProcessEnv extends z.infer<typeof envVariables> { }
  }
}
