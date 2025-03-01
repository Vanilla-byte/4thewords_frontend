import { Duration } from "effect";
import type { DurationInput } from "effect/Duration";

export const debounce = <A extends unknown[]>(fn: (...args: A) => void, wait: DurationInput) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: A) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), Duration.toMillis(wait));
  };
};
