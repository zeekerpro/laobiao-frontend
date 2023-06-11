<script lang="ts">
  import Icon from "@iconify/svelte"

  let classes = ''
  export { classes as class }

  let isOpen = false

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
  <aside class="drawer-side">
    <label for="side-toggle" class="drawer-overlay"></label>
    <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content bg-opacity-95">
      <!-- Sidebar content here -->
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </aside>
</div>
