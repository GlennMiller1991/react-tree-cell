import {tErrorState} from "../types/errorState";

export function updateErrors(
  oldErrors: tErrorState | undefined,
  newErrors: tErrorState | undefined): tErrorState | undefined {
  if (!oldErrors || !newErrors) return oldErrors || newErrors
  return {
    ...oldErrors,
    ...newErrors,
  }
}
