<script lang="ts">
  import Icon from "@iconify/svelte"
  import { session } from "$stores/session"
  import { sidemenus } from "$configs";
</script>

<aside class="p-4 w-80 h-full bg-base-100 text-base-content">

  <a href="#" class="btn btn-ghost btn-sm rounded-btn">
    <Icon icon="radix-icons:avatar" class="w-6 h-6" />
    <span>{$session.user.username} </span>
    <Icon icon="line-md:arrow-right" class="text-lg" />
  </a>

  <ul class="menu mt-8 flex gap-2">

  {#each sidemenus as sidemenu}
    <li>
      <a href="{sidemenu.link}" class="text-lg font-medium capitalize">
        <Icon icon="{sidemenu.icon}" class="text-2xl mr-3" />
        <span> {sidemenu.label} </span>
        <Icon icon="icon-park-outline:right" class="text-xl" />
      </a>
    </li>
  {/each}

  </ul>
</aside>
