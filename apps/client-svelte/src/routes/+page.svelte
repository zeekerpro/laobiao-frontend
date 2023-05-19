<script lang="ts">
  import { onMount } from "svelte";
  import { isLoggedIn } from "@stores/userSession";

  // onMount(() => {
  //   if(!$isLoggedIn){
  //     goto("/signin")
  //   }
  // });

</script>

<svelte:head>
  <title>Home</title>
</svelte:head>
