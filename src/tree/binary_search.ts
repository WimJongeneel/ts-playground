type BST<a> = {
  value: a
  left: BST<a> | null
  rigth: BST<a> | null
}

const bst_from = <a>(a: a): BST<a> => ({
  value: a,
  left: null,
  rigth: null
})

const bst_insert = <a>(t: BST<a>) => (a: a): BST<a> =>
  a < t.value
    ? ({ ...t, left: t.left ? a > t.value ? { value: a, left: t.left, rigth: t.rigth } : bst_insert(t.left)(a) : bst_from(a) })
    : ({ ...t, rigth: t.rigth ? a < t.value ? { value: a, left: t.left, rigth: t.rigth } : bst_insert(t.rigth)(a) : bst_from(a) })

const bst_contains = <a>(t: BST<a>) => (a: a): boolean =>
  bst_search(t)(a) != null

const bst_search = <a>(t: BST<a>) => (a: a): a | null =>
  t.value == a
    ? a
    : a < t.value
      ? t.left ? bst_search(t.left)(a) : null
      : t.rigth ? bst_search(t.rigth)(a) : null

const bst_to_array = <a>(t: BST<a>, a: a[] = []): a[] => {
  if (t.left) bst_to_array(t.left, a)
  a.push(t.value)
  if (t.rigth) bst_to_array(t.rigth, a)
  return a
}

const bst_from_array = <a>(a: a[]): BST<a> | null => {
  if (a.length == 0) return null
  if (a.length == 1) return bst_from(a[0])
  const mi = Math.floor(a.length / 2)
  return {
    value: a[mi],
    left: bst_from_array(a.slice(0, mi)),
    rigth: bst_from_array(a.splice(mi))
  }
}

const bst_balance = <a>(t: BST<a>): BST<a> =>
  bst_from_array(bst_to_array(t))!

const bst_max = <a>(t: BST<a>): a =>
  t.rigth ? bst_max(t.rigth) : t.value

const bst_min = <a>(t: BST<a>): a =>
  t.left ? bst_min(t.left) : t.value

export const test = () => {
  const t1 = bst_from(1)
  const t2 = bst_insert(t1)(2)
  const t3 = bst_insert(t2)(3)
  const t4 = bst_insert(t3)(4)
  const t5 = bst_insert(t4)(5)
  const t6 = bst_insert(t5)(6)
  const t7 = bst_insert(t6)(7)
  const t8 = bst_insert(t7)(8)
  console.log(t8)
  const a1 = bst_to_array(t8)
  console.log(a1)
  const t9 = bst_from_array(a1)
  console.log(bst_balance(t8))
  if (t9 == null) return
  console.log(bst_max(t9))
  console.log(bst_min(t9))
}