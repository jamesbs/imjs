export const ValueUnknown = Symbol('value-unknown')

export type ValueUnknown = typeof ValueUnknown

export const isValueUnknown = (value: any): value is ValueUnknown =>
  value === ValueUnknown

export const isValueKnown = <T>(value: T | ValueUnknown): value is T =>
  value !== ValueUnknown
