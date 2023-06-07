<script lang="ts">
import LogoAnimation from "@components/LogoAnimation.svelte";
import ThemeSwitcher from "@components/ThemeSwitcher.svelte";
</script>

<ThemeSwitcher class="fixed right-2 top-2" />

<section class="flow-root">

  <LogoAnimation class="mt-8" dancing={false} />

  <div class="sm:mt-16">
    <section class="
      rounded border-0
      w-full sm:max-w-md
      mt-6 mx-auto
      overflow-hidden
      "
      >
      <slot></slot>
    </section>
  </div>
</section>
