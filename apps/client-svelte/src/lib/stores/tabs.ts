import { writable, derived } from "svelte/store";
import { tabs } from "$configs";

export const activeTabIndex = writable(0);

export const activeTab = derived(
  activeTabIndex,
  $activeTabIndex => tabs[$activeTabIndex]
)

