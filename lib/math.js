import { curry } from 'yafu'
import { add } from './common-util.js'

export const dbl = curry((n) => add(n, n))
