export const setClasses = (...classes: (string | boolean | undefined | null)[]) => {
  let res = ''
  if (!classes) return res
  for (let styleClass of classes) {
    if (styleClass) res += ' ' + styleClass
  }
  return res
}
