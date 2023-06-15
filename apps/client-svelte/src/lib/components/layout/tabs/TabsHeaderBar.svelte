<script lang="ts">
  import HeaderWrapper from "$components/layout/HeaderWrapper.svelte";
  import LogoAnimation from "$components/layout/LogoAnimation.svelte";
  import AsideDrawer from "$components/layout/AsideDrawer.svelte";
  import ThemeSwitcher from "$components/layout/ThemeSwitcher.svelte";
</script>

<HeaderWrapper class="flex items-center">
  <AsideDrawer class="grow-0 w-auto" />
  <LogoAnimation class="grow" />
  <ThemeSwitcher class="grow-0" />
</HeaderWrapper>



