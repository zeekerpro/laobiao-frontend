import { writable, derived } from "svelte/store";
import { isExcludedViewStack } from "$configs";
import type { NavigationTarget } from "@sveltejs/kit";

// histories stack
function createViewStack(){
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    push: (route: NavigationTarget) => update((stack) => {
      // same page, not add to stack
      if(stack[stack.length - 1] === route) return stack
      // if is excluded view stack, not add to stack
      if(isExcludedViewStack(route)) return stack
      stack.push(route)
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
