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

