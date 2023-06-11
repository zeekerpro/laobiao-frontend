<script>
  import LogoAnimation from "$components/layout/LogoAnimation.svelte";
  import ThemeSwitcher from "$components/ThemeSwitcher.svelte";
</script>

<LogoAnimation class="h-screen flex justify-center" dancing={true} />
<ThemeSwitcher class="fixed top-3 right-3" />
