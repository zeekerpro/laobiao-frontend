<script lang="ts">
  import TabTransition from "$components/layout/tabs/TabTransition.svelte";
  import { db } from "$db";
  import Icon from "@iconify/svelte"
  import { liveQuery } from "dexie";

  let chats = liveQuery(() => db.chats.toArray() )

 </script>

<TabTransition>


{#if $chats?.length}

  <div class="m-4 rounded flex flex-col">
    {#each $chats as chat }
      <a href="/chat/{chat.id}"
        class="flex items-center justify-between btn"
        >
        <Icon icon="ion:chatbox-outline" class="text-2xl font-semibold"></Icon>
        <div class="grow ml-2">
          <p class="text-left"> {chat.name} </p>
        </div>
        <Icon icon="ion:chevron-forward-outline"></Icon>
      </a>
    {/each}
  </div>

{/if}

<a class="btn btn-circle
  text-2xl bg-transparent
  w-12 h-12
  fixed-silky bottom-32 right-2
  translate-x-0
  will-change-transform
  "
  href="/chat"
  >
  <Icon class="" icon="material-symbols:add" />
</a>

</TabTransition>


