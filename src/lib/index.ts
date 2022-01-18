type TriggerCallback<T = any> = (triggerParam: T) => void
const createCallbacksTrigger = <T>() => {
  let callbacks: TriggerCallback<T>[] = []

  return {
    registerCallback(cb: TriggerCallback<T>) {
      callbacks.push(cb)
      return () => (callbacks = [])
    },
    trigger(triggerParam: T): Promise<any> {
      return Promise.all(
        callbacks.map((cb) => Promise.resolve(cb(triggerParam)))
      )
    },
  }
}

export const createTriggerAction = <P = any, T = any | undefined>(
  fn: (node: HTMLElement, param: P, triggerParam: T) => void | Promise<void>
) => {
  const { trigger, registerCallback } = createCallbacksTrigger<T>()
  return {
    triggerAction: (node: HTMLElement, initialParam: P) => {
      let param = initialParam
      const cleanup = registerCallback((triggerParam: T) =>
        fn(node, param, triggerParam)
      )
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

export const createAnimationTriggerAction = (globalClassName?: string) => {
  const { trigger, triggerAction } = createTriggerAction<
    string | undefined,
    string | undefined
  >(
    (node, actionClassName, triggerClassName) =>
      new Promise((resolve) => {
        let className = triggerClassName || actionClassName || globalClassName
        if (className) {
          node.addEventListener('animationend', () => {
            node.classList.remove(className!)
            resolve()
          })
          node.classList.add(className)
        }
      })
  )
  return {
    triggerAnimation: (className?: string) => trigger(className),
    animationAction: (node: HTMLElement, className?: string) =>
      triggerAction(node, className),
  }
}
