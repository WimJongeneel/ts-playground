type stack<a> = {
  value: a
  next: stack<a> | null
}

const stack_from = <a>(a: a): stack<a> => ({
  value: a,
  next: null
})

const stack_push = <a>(s: stack<a>) => (a: a): stack<a> => ({
  value: a,
  next: s
})

const stack_pop = <a>(s: stack<a>): [a, stack<a> | null] => [
  s.value,
  s.next
]

const stack_count = <a>(s: stack<a>, i = 1): number =>
  s.next ? stack_count(s.next, i + 1) : i

const stack_peek = <a>(s: stack<a>): a =>
  s.value
  
export const test = () => {
  const s1 = stack_from(1)
  const s2 = stack_push(s1)(2)
  const s3 = stack_push(s2)(3)
  console.log(stack_count(s3))
  console.log(stack_pop(s3))
}