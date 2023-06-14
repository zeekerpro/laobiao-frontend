import { writable, derived } from "svelte/store";
import { tabs } from "$configs";

export const tabsInfo = writable({
  activeTabIndex: 0,
  prevTabIndex: 0,
})

export const activeTab = derived(
  tabsInfo,
  $tabsInfo => tabs[$tabsInfo.activeTabIndex]
)

export const viewStack = writable([])
export const showView = derived(
  viewStack,
  $viewStack => $viewStack.length > 0
)
