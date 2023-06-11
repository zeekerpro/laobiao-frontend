<script lang="ts">
  import LogoAnimation from "$components/layout/LogoAnimation.svelte";
  import AsideDrawer from "$components/layout/AsideDrawer.svelte";
  import ThemeSwitcher from "$components/ThemeSwitcher.svelte";

  let classes = ''; export { classes as class };

</script>

<div class="{classes}
  bg-base-100 bg-opacity-90
  fixed top-0
  flex items-center
  w-full px-4 py-2
  shadow-[0_1px_2px_-2px_hsl(var(--inc))]
  ">
  <AsideDrawer class="grow-0 w-auto" />
  <LogoAnimation class="grow" />
  <ThemeSwitcher class="grow-0" />
</div>



