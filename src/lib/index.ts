type TriggerCallback<T = any> = (triggerParam: T) => void
const createCallbacksTrigger = <T>() => {
  let callbacks: TriggerCallback<T>[] = []

  return {
    registerCallback(cb: TriggerCallback<T>) {
      callbacks.push(cb)
      return () => (callbacks = [])
    },
    trigger(triggerParam: T) {
      callbacks.forEach((cb) => cb(triggerParam))
    },
  }
}

export const createTriggerAction = <P = any, T = any | undefined>(
  fn: (node: HTMLElement, param: P, triggerParam: T) => void
) => {
  const { trigger, registerCallback } = createCallbacksTrigger<T>()
  return {
    triggerAction: (node: HTMLElement, initialParam: P) => {
      let param = initialParam
      const cleanup = registerCallback((triggerParam: T) => {
        fn(node, param, triggerParam)
      })
      return {
        update(param: P) {
          param = param
        },
        destroy() {
          cleanup()
        },
      }
    },
    trigger,
  }
}

export const createAnimationTriggerAction = () => {
  const { trigger, triggerAction } = createTriggerAction<never, string>(
    (node, _, className) => {
      node.addEventListener('animationend', () =>
        node.classList.remove(className)
      )
      node.classList.add(className)
    }
  )
  return {
    triggerAnimation: trigger,
    animationAction: triggerAction,
  }
}
