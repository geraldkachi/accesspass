import { useCallback, useEffect, useRef } from "react";
import type { DependencyList } from "react";

type CallbackFunction = () => void;

export default function useDebounceFuntion(
  fn: CallbackFunction, 
  ms: number, 
  deps: DependencyList
): [() => boolean, () => void] {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);
  useEffect(reset, deps);
  return [isReady, cancel];
}

function useTimeoutFn(
  fn: CallbackFunction, 
  ms: number = 0
): [() => boolean, () => void, () => void] {
  const ready = useRef<boolean>(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const callback = useRef<CallbackFunction>(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    if (timeout?.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = false;
    if (timeout?.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  // update ref when function changes
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // set on mount, clear on unmount
  useEffect(() => {
    set();

    return clear;
  }, [ms]);

  return [isReady, clear, set];
}