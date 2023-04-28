<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { isLoggedIn } from "@stores/userSession";

  onMount(() => {
    if(!$isLoggedIn){
      goto("/signin")
    }
  });

</script>

<svelte:head>
  <title>Home</title>
</svelte:head>
