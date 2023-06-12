<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import PageTransition from "$components/layout/PageTransition.svelte";
  import Icon from "@iconify/svelte"

  onMount(async () => {
    console.log(` page ${$page.url.pathname} onmount....`)
  })
</script>

<PageTransition>

<button class="btn btn-circle fixed bottom-32 right-2 text-2xl bg-info">
  <Icon class="" icon="material-symbols:add" />
</button>

</PageTransition>


