<script lang="ts">
  import "@styles/app.css";
  import ThemeSwitcher from "@components/ThemeSwitcher.svelte";
  import PageTransition from "@components/PageTransition.svelte";
  import { navigating } from "$app/stores";
  import config  from "./config.json";
  import { guard } from "@utils/client/routeMonitor";

  // route guard
  $: if($navigating) {
    // @ts-ignore
    guard($navigating, config.authWhiteList)
  }

</script>

<main class="flow-root">

  <div class="fixed top-3 right-6">
    <ThemeSwitcher />
  </div>

  <PageTransition>
    <slot></slot>
  </PageTransition>

</main>
