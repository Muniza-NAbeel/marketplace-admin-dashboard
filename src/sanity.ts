import { createClient } from '@sanity/client';

const client = createClient({
  projectId: "kpy3htu1",
  dataset: "production",
  apiVersion: '2025-01-17',
  token:"skUOJ8cJH6ho2KdvYOqEJ93PZ1Dg4gyYxFpLlseStpyB6T4s5ADxCCmA7fbj4nt4l0HvZxe58tmGLSar2R8VGjzSIl0FydCFgi0jfgUb7Ks67cwI9BO9tu2upw6hJQ2e1QG8BMbTlOrbN3KOJPhCEy5doGDI3QXEqvcA3QZJTq0v1iRdfsCr",
  useCdn: true
});

export default client;