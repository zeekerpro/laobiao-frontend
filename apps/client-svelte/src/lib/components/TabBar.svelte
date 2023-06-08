<script lang="ts">
import {page} from "$app/stores"
import Icon from "@iconify/svelte"

let tabs = [
  {
    id: "home",
    label: "home",
    path: "/",
    icon: {
      active: "mdi:home",
      inactive: "mdi:home-outline"
    }
  },
  {
    id: "chat",
    label: "chat",
    path: "/chat",
    icon: {
      active: "mdi:chat",
      inactive: "mdi:chat-outline"
    }
  },
  {
    id: "profile",
    label: "profile",
    path: "/profile",
    icon: {
      active: "mdi:account",
      inactive: "mdi:account-outline"
    }
  }
]

$: currentPath = $page.url.pathname

</script>

<footer class=" fixed bottom-0 w-full ">
  <div class="tabs flex justify-between border border-base-300 ">
    {#each tabs as tab}
      <a class="tab pb-3
        {currentPath == tab.path ? 'tab-active text-secondary-focus' : ''}
        grow h-auto
        flex flex-col items-center justify-center flex-nowrap
        "
        href={tab.path}
        >
        <Icon icon="{currentPath == tab.path ? tab.icon.active: tab.icon.inactive}" class="text-3xl my-1 " />
      </a>
    {/each}
  </div>

</footer>
