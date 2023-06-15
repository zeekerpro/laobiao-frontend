<script lang="ts">
import Icon from "@iconify/svelte"
import { tabs } from "$configs"
import { tabsInfo }  from "$stores/layouts"

$: activeTabIndex = $tabsInfo.activeTabIndex

</script>

<footer class="h-24
  bg-base-100
  fixed bottom-0 w-full overflow-hidden
  shadow-[0_-1px_2px_-2px_hsl(var(--inc))]
  ">
  <div class="tabs flex justify-between">
    {#each tabs as tab}
      <button class="tab py-2
        { activeTabIndex == tab.index ? 'tab-active text-secondary-focus' : ''}
        grow h-auto
        flex flex-col items-center justify-center flex-nowrap
        "
        on:click={() => $tabsInfo.activeTabIndex = tab.index }
        >
        <Icon
          icon="{ activeTabIndex == tab.index ? tab.icon.active: tab.icon.inactive}"
          class="text-3xl my-1 "
        />
        <span class="text-xs">{tab.label}</span>
      </button>
    {/each}
  </div>
</footer>
