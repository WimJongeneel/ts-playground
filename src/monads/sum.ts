interface fun<a, b> {
  (_: a): b
}

type left<a> = { kind: 'left', value: a }
type rigth<a> = { kind: 'rigth', value: a }
type sum<a, b> = left<a> | rigth<b>

const left = <a, b>(a: a): sum<a, b> => ({ kind: 'left', value: a })
const rigth = <a, b>(b: b): sum<a, b> => ({ kind: 'rigth', value: b })

const sum_map = <a, b, c, d>(s: sum<a, b>) => (f: fun<a, c>, g: fun<b, d>): sum<c, d> =>
  s.kind == 'left' ? left(f(s.value)) : rigth(g(s.value))

const sum_cast = <a, b, c>(s: sum<a, b>) => (f: fun<a, c>, g: fun<b, c>): c =>
  s.kind == 'left' ? f(s.value) : g(s.value)

const sum_join = <a, b>(s: sum<sum<a, b>, sum<a, b>>): sum<a, b> =>
  s.value

const sum_bind = <a, b, c, d>(s: sum<a, b>) => (f: fun<a, sum<c, d>>, g: fun<b, sum<c, d>>): sum<c, d> =>
  sum_join(sum_map<a, b, sum<c, d>, sum<c, d>>(s)(f, g))