<script lang="ts">
  import NavWrapper from "$components/layout/NavWrapper.svelte";
  import LogoAnimation from "$components/layout/LogoAnimation.svelte";
  import AsideDrawer from "$components/layout/AsideDrawer.svelte";
  import ThemeSwitcher from "$components/layout/ThemeSwitcher.svelte";
</script>

<NavWrapper class="flex items-center">
  <AsideDrawer class="grow-0 w-auto" />
  <LogoAnimation class="grow" />
  <ThemeSwitcher class="grow-0" />
</NavWrapper>



