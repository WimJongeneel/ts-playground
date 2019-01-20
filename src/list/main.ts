interface fun<a, b> {
  (_: a): b
}

type List<a> = {
  value: a
  tail: List<a> | null
}

const list_from = <a>(a: a): List<a> => ({
  value: a,
  tail: null
})

const list_prepend = <a>(l: List<a>) => (a: a): List<a> => ({
  value: a,
  tail: l
})

const list_append = <a>(l: List<a>) => (a: a): List<a> =>
  ({ ...l, tail: l.tail ? list_append(l.tail)(a) : list_from(a) })

const list_map = <a, b>(l: List<a>) => (f: fun<a, b>): List<b> => ({
  value: f(l.value),
  tail: l.tail ? list_map<a, b>(l.tail)(f) : null
})

const list_filter = <a>(l: List<a>) => (f: fun<a, boolean>): List<a> | null =>
  f(l.value) ?
    ({
      value: l.value,
      tail: l.tail ? list_filter(l.tail)(f) : null
    })
    : l.tail ? list_filter(l.tail)(f) : null

const list_reduce = <a, b>(l: List<a>) => (f: fun<[b, a], b>) => (b: b): b =>
  l.tail ? list_reduce<a, b>(l.tail)(f)(f([b, l.value])) : f([b, l.value])

const list_count = <a>(l: List<a>, c = 1): number =>
  l.tail ? list_count(l.tail, c + 1) : c

const list_get = <a>(l:List<a>) => (i:number, _i: number = 0): a | null => 
  _i == i ? l.value : l.tail ? list_get(l.tail)(i, _i+1) : null

const list_set = <a>(l:List<a>) => (i:number, _i = 0) => (a:a): List<a> =>
  ({value: _i == i ? a : l.value, tail: l.tail ? list_set(l.tail)(i, _i+1)(a) : null})

export const test = () => {
  const l = list_from(1)
  console.log(l)
  const l2 = list_prepend(l)(2)
  console.log(l2)
  const l5 = list_append(l2)(3)
  console.log(l5)
  const l3 = list_map<number, number>(l5)(x => x + 2)
  console.log(l3)

  const l6 = list_reduce<number, number>(l3)(v => v[0] + v[1])(0)
  const l7 = list_prepend(list_prepend(list_from(1))(2))(3)
  console.log(l7)

  console.log(list_get(l7)(0))
  console.log(list_get(l7)(1))
  console.log(list_get(l7)(2))
  console.log(list_get(l7)(3))

  console.log(list_set(l7)(8)(9))
}