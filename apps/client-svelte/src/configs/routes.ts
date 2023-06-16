import type { NavigationTarget } from "@sveltejs/kit"

export const authWhiteList =  [
  "/(auth)/signin",
  "/(auth)/signup",
  "/(auth)/forgot"
]

export const excludedViewStacks= authWhiteList

export function isExcludedViewStack(route: NavigationTarget){
  return excludedViewStacks.includes(route.route.id)
}

export function isAuthRoute(route: NavigationTarget){
  return route.route.id.startsWith("/(auth)")
}


