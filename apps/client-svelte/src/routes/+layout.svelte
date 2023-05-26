<script lang="ts">
  import "@styles/app.css";
  import ThemeSwitcher from "@components/ThemeSwitcher.svelte";
  import PageTransition from "@components/PageTransition.svelte";

</script>

<main class="flow-root">

  <div class="fixed top-3 right-6">
    <ThemeSwitcher />
  </div>

  <PageTransition>
    <slot></slot>
  </PageTransition>

</main>
