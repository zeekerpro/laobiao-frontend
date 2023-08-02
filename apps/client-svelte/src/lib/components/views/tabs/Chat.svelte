<script lang="ts">
  import TabTransition from "$components/layout/tabs/TabTransition.svelte";
  import { db } from "$db";
  import Icon from "@iconify/svelte"
  import { liveQuery } from "dexie";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let chats = liveQuery(() => db.chats.toCollection().reverse().sortBy("updatedAt"))

  let showActionsId = null

  onMount(() => {
    db.chats.each((chat, cursow) => {
      if(!chat.createdAt){ db.chats.update(chat.id, { createdAt: new Date()}) }
      if(!chat.updatedAt){ db.chats.update(chat.id, { updatedAt: new Date()}) }
    })
  })

  function clickOutside(node :any) {
    const handlClick = event => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        node.dispatchEvent(
          new CustomEvent('clickOutside', node)
        )
      }
    }

    document.addEventListener('click', handlClick, true)

    return {
      destroy() {
        document.removeEventListener('click', handlClick, true)
      }
    }
  }

 </script>

<TabTransition>

{#if $chats?.length}

  <div class="m-4 rounded flex flex-col">
    {#each $chats as chat }
      <a href="/chat/{chat.id}"
        class="btn mt-1 grid grid-cols-9 relative"
        >
        <div class="col-span-1 flex">
          <Icon icon="ion:chatbox-outline" class="text-2xl font-semibold "></Icon>
        </div>
        <div class="col-span-6">
          <p class="text-left overflow-hidden text-ellipsis whitespace-nowrap"> {chat.name} </p>
        </div>
        <div
          class="col-span-2 flex flex-row-reverse items-center"
          use:clickOutside
          on:clickOutside={() => showActionsId = null}
          on:click|stopPropagation|preventDefault={() => showActionsId = chat.id}
          >

          <button transition:fade >
            <Icon icon="mdi:dots-horizontal"
              class="text-3xl { showActionsId == chat.id ? 'hidden' : 'block'} "
            />
          </button>

          <ul class="text-xl flex gap-1 text-3xl
            { showActionsId == chat.id ? 'block' : 'hidden'}
            "
            transition:fade
            >
            <li> <button> <Icon icon="circum:edit" class=""></Icon> </button> </li>
            <li> <button> <Icon icon="ion:trash" class="text-error"></Icon> </button> </li>
          </ul>

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


