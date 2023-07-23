<script lang="ts">
  import TabTransition from "$components/layout/tabs/TabTransition.svelte";
  import { db } from "$db";
  import Icon from "@iconify/svelte"
  import { liveQuery } from "dexie";
    import { onMount } from "svelte";

  let chats = liveQuery(() => db.chats.toCollection().reverse().sortBy("updatedAt"))

  onMount(() => {
    db.chats.each((chat, cursow) => {
      if(!chat.createdAt){ db.chats.update(chat.id, { createdAt: new Date()}) }
      if(!chat.updatedAt){ db.chats.update(chat.id, { updatedAt: new Date()}) }
    })
  })

 </script>

<TabTransition>


{#if $chats?.length}

  <div class="m-4 rounded flex flex-col">
    {#each $chats as chat }
      <a href="/chat/{chat.id}"
        class="btn mt-1 grid grid-cols-9"
        >
        <div class="col-span-1">
          <Icon icon="ion:chatbox-outline" class="text-2xl font-semibold "></Icon>
        </div>
        <div class="col-span-7">
          <p class="text-left overflow-hidden text-ellipsis whitespace-nowrap"> {chat.name} </p>
        </div>
        <div class="col-span-1 text-right">
          <Icon icon="icon-park-outline:right" class="text-xl" />
        </div>
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


