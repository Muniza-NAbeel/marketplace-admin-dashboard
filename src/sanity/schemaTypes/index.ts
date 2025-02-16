import { type SchemaTypeDefinition } from 'sanity'
import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import orderSchema from './order'
import carSchema from './cars'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, orderSchema, carSchema,  postType, authorType],
}
