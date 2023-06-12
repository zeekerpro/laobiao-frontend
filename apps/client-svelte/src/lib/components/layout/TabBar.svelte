<script lang="ts">
import {page} from "$app/stores"
import Icon from "@iconify/svelte"
import { tabs }  from "$configs"

$: currentPath = $page.url.pathname

let classes = ''
export { classes as class }

</script>

<footer class="{classes}
  bg-base-100
  fixed bottom-0 w-full overflow-hidden
  ">
  <div class="tabs flex justify-between border-t border-t-primary ">
    {#each tabs as tab}
      <a class="tab py-2
        {currentPath == tab.path ? 'tab-active text-secondary-focus' : ''}
        grow h-auto
        flex flex-col items-center justify-center flex-nowrap
        "
        href={tab.path}
        >
        <Icon icon="{currentPath == tab.path ? tab.icon.active: tab.icon.inactive}" class="text-3xl my-1 " />
        <span class="text-xs">{tab.label}</span>
      </a>
    {/each}
  </div>
</footer>
