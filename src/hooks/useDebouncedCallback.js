import { useCallback, useEffect, useRef } from 'react'

export function useDebouncedCallback(callback, delayMs) {
  const callbackRef = useRef(callback)
  const timeoutRef = useRef(null)
  const lastArgsRef = useRef([])

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const cancel = useCallback(() => {
    if (timeoutRef.current === null) return
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = null
  }, [])

  const flush = useCallback(() => {
    if (timeoutRef.current === null) return
    cancel()
    callbackRef.current(...lastArgsRef.current)
  }, [cancel])

  useEffect(() => cancel, [cancel])
  useEffect(() => cancel(), [delayMs, cancel])

  const debounced = useCallback(
    (...args) => {
      lastArgsRef.current = args

      cancel()

      if (delayMs <= 0) {
        callbackRef.current(...args)
        return
      }

      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null
        callbackRef.current(...args)
      }, delayMs)
    },
    [cancel, delayMs],
  )

  return { debounced, cancel, flush }
}
