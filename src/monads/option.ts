interface fun<a, b> {
  (_: a): b
}

type some<a> = { kind: 'some', value: a }
type none = { kind: 'none' }
type Option<a> = some<a> | none

const none: none = { kind: 'none' }
const some: <a>(_: a) => some<a> = a => ({ kind: 'some', value: a })

const option_map = <a, b>(o: Option<a>) => (f: fun<a, b>): Option<b> =>
  o.kind == 'none' ? none : some(f(o.value))

const option_join = <a>(o: Option<Option<a>>): Option<a> =>
  o.kind == 'some' ? o.value : o

const option_bind = <a, b>(o: Option<a>) => (f: fun<a, Option<b>>): Option<b> =>
  option_join<b>(option_map<a, Option<b>>(o)(f))

export const test = () => {
  const x = some(1)
  console.log(option_map(x)(x => x + 2))
  console.log(option_bind(x)(x => x == 1 ? none : some(x)))
}