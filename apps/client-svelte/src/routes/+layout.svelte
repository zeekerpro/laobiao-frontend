<script lang="ts">
  import "@styles/app.css";
  import ThemeSwitcher from "@components/ThemeSwitcher.svelte";
</script>

<main class="flow-root">

  <div class="fixed top-3 right-6">
    <ThemeSwitcher />
  </div>

  <slot></slot>

</main>
