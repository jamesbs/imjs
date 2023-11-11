export type Id<T> = {
  id: T
}

export type Identifier<T> = T extends Id<infer K> ? K : never
