<script lang="ts">
import PageTransition from "@components/PageTransition.svelte";
import LogoAnimation from "@components/LogoAnimation.svelte";
import ThemeSwitcher from "@components/ThemeSwitcher.svelte";
</script>

<section class="flex justify-between items-center fixed top-0 w-full">
  <LogoAnimation class="mx-4" dancing={false} />
  <ThemeSwitcher />
</section>

<section>
  <PageTransition>
    <slot></slot>
  </PageTransition>
</section>
