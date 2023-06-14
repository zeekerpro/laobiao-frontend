<script lang="ts">
  import TabTransition from "$components/layout/tabs/TabTransition.svelte";
  import Icon from "@iconify/svelte"
  import { onDestroy, onMount } from "svelte";

  let showAddChat = false;

  let showAddChatTimer :any;

  onMount(() => {
    showAddChatTimer = setTimeout(() => {
      showAddChat = true;
    }, 1000);
  })

  onDestroy(() => {
    clearTimeout(showAddChatTimer);
  })

</script>

<TabTransition>

this is chat page

{#key showAddChat}
  <button class="btn btn-circle
    fixed bottom-32 right-2
    text-2xl bg-info
    transition-opacity duration-500
    {showAddChat ? 'opacity-100' : 'opacity-0'}
    ">
    <Icon class="" icon="material-symbols:add" />
  </button>
{/key}

</TabTransition>


