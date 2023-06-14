import ChatTabView from "$components/views/tabs/Chat.svelte";
import HomeTabView from "$components/views/tabs/Home.svelte";

export const tabs = [
  {
    index: 0,
    label: "home",
    view: HomeTabView,
    icon: {
      active: "mdi:home",
      inactive: "mdi:home-outline"
    },
  },
  {
    index: 1,
    label: "chat",
    view: ChatTabView,
    icon: {
      active: "mdi:chat",
      inactive: "mdi:chat-outline"
    }
  }
]


