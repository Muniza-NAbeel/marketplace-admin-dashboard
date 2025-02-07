export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-21'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const token = assertValue(
  "skUOJ8cJH6ho2KdvYOqEJ93PZ1Dg4gyYxFpLlseStpyB6T4s5ADxCCmA7fbj4nt4l0HvZxe58tmGLSar2R8VGjzSIl0FydCFgi0jfgUb7Ks67cwI9BO9tu2upw6hJQ2e1QG8BMbTlOrbN3KOJPhCEy5doGDI3QXEqvcA3QZJTq0v1iRdfsCr", 
   'Missing environment variable: SANITY_API_TOKEN'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
