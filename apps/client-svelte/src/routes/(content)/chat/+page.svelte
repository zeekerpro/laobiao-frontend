<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import PageTransition from "$components/layout/PageTransition.svelte";

  onMount(async () => {
    console.log(` page ${$page.url.pathname} onmount....`)
  })
</script>


<PageTransition>
this is chat page
</PageTransition>


