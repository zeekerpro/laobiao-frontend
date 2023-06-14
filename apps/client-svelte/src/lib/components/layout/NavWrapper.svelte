<script lang="ts">
  let classes = ''; export { classes as class };
</script>

<nav class="{classes}
  h-12
  w-full
  px-4 py-2
  fixed top-0
  bg-base-100 bg-opacity-95 z-10
  shadow-[0_1px_2px_-2px_hsl(var(--inc))]
  ">
  <slot></slot>
</nav>



