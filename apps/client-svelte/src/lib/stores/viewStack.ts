import { writable, derived } from "svelte/store";

// histories stack
function createViewStack(){
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    push: (urlPath: string) => update((stack) => {
      // same page, not add to stack
      if(stack[stack.length - 1] === urlPath) return stack
      stack.push(urlPath)
      return stack
    }),
    pop: () => update((stack) => {
      if(stack.length > 0) { stack.pop() }
      return stack
    }),
    clear: () => set([]),
  }
}
export const viewStack = createViewStack()
export const showView = derived( viewStack, $viewStack => $viewStack.length > 0)
export const currentView = derived(viewStack, $viewStack => $viewStack[$viewStack.length - 1])
