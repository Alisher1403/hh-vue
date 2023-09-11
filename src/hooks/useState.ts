import { Ref, UnwrapRef, ref } from "vue";

export function useState<Type>(arg: Type): [Ref<UnwrapRef<Type>>, any] {
  const varibale = ref<Type>(arg);

  function setChangedVariable(funcArg: UnwrapRef<Type>): void {
    varibale.value = funcArg;
  }

  return [varibale, setChangedVariable];
}
