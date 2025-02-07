import { groq } from "next-sanity";

export const allCars = groq `*[_type == "car"]`;
