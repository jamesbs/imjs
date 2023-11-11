import { Alias } from '../alias'
import { createAssert } from 'typia'
import { Identifier } from '../id'

export const getAliasByIdInput = createAssert<Identifier<Alias>>()
