<script lang="ts">
  import Icon from "@iconify/svelte"
  import { session } from "$stores/session"
  import { sidemenus } from "$configs";
  import { goto } from "$app/navigation";
  import { isOpenAside  } from "$stores/layouts";

  let classes = ''
  export { classes as class }

</script>

<div class="drawer {classes}">
  <input id="side-toggle" type="checkbox" class="drawer-toggle" bind:checked={$isOpenAside} />
  <div class="drawer-content">
    <label for="side-toggle" class="text-2xl">
      {#key $isOpenAside}
        <Icon icon="line-md:close-to-menu-alt-transition" ></Icon>
      {/key}
    </label>
  </div>
  <div class="drawer-side duration-500 z-30">
    <label for="side-toggle" class="drawer-overlay"></label>

    <!-- side menus here -->
    <aside class="p-4 w-80 h-screen bg-base-100 text-base-content">
      <a href="/" class="btn btn-ghost btn-sm rounded-btn">
        <Icon icon="radix-icons:avatar" class="w-6 h-6" />
        <span>{$session.user.username} </span>
        <Icon icon="line-md:arrow-right" class="text-lg" />
      </a>

      <ul class="menu mt-8 flex gap-2">

      {#each sidemenus as sidemenu}
        <li>
          <button
            class="text-lg font-medium capitalize"
            on:click={() => { goto(sidemenu.path)} }
            >
            <Icon icon="{sidemenu.icon}" class="text-2xl mr-3" />
            <span> {sidemenu.label} </span>
            <Icon icon="icon-park-outline:right" class="text-xl" />
          </button>
        </li>
      {/each}

      </ul>
    </aside>

  </div>
</div>
