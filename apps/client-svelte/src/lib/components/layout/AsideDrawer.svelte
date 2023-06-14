<script lang="ts">
  import Icon from "@iconify/svelte"
  import Sidebar from "./Sidebar.svelte"

  let classes = ''
  export { classes as class }

  let isOpen = true

</script>

<div class="drawer {classes}">
  <input id="side-toggle" type="checkbox" class="drawer-toggle" bind:checked={isOpen} />
  <div class="drawer-content">
    <label for="side-toggle" class="text-2xl">
      {#key isOpen}
        <Icon icon="line-md:close-to-menu-alt-transition" ></Icon>
      {/key}
    </label>
  </div>
  <div class="drawer-side">
    <label for="side-toggle" class="drawer-overlay"></label>
    <Sidebar />
  </div>
</div>
