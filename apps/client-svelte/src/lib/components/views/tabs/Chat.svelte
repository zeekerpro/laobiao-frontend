<script lang="ts">
  import TabTransition from "$components/layout/tabs/TabTransition.svelte";
  import { db } from "$db";
  import Icon from "@iconify/svelte"
  import { liveQuery } from "dexie";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let chats = liveQuery(() => db.chats.toCollection().reverse().sortBy("updatedAt"))

  let activeChat = null

  let showDeleteConfirmModal = false

  onMount(() => {
    db.chats.each((chat, cursow) => {
      if(!chat.createdAt){ db.chats.update(chat.id, { createdAt: new Date()}) }
      if(!chat.updatedAt){ db.chats.update(chat.id, { updatedAt: new Date()}) }
    })
  })

  function clickOutside(node :any) {
    const handlClick = event => {
      // don't dispatch 'clickOutside' Event on element has dataset.excludeOutsideClick = "true" attribute
      if(event.target.dataset.excludeOutsideClick == "true" || showDeleteConfirmModal) return
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

  async function deleteChat() {
    if(!activeChat) return
    await db.chats.delete(Number(activeChat.id))
    activeChat = null
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
          class="chat-actions col-span-2 flex flex-row-reverse items-center"
          use:clickOutside
          on:clickOutside={() => activeChat = null}
          on:click|stopPropagation|preventDefault={() => activeChat = chat }
          >

          <button transition:fade >
            <Icon icon="mdi:dots-horizontal"
              class="text-3xl { activeChat?.id == chat.id ? 'hidden' : 'block'} "
            />
          </button>

          <ul class="text-xl flex justify-center
            { activeChat?.id == chat.id ? 'block' : 'hidden'}
            "
            transition:fade
            >
            <li>
              <button class="w-9 h-9 flex justify-center items-center hidden">
                <Icon icon="circum:edit" class=""></Icon>
              </button>
            </li>
            <li>

              <button class="w-9 h-9 flex justify-center items-center"
                on:click|stopPropagation|preventDefault={() => {
                  activeChat = chat
                  if(!!activeChat){
                    deleteConfirmModal.showModal();
                    showDeleteConfirmModal = true
                  }
                }}
                >
                <Icon icon="ion:trash" class="text-error"></Icon>
              </button>
            </li>
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


<!-- Open the modal using ID.showModal() method -->
<dialog id="deleteConfirmModal" class="modal sm:modal-middle">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">Delete Chat</h3>
    <p class="py-4">
      this will delete chat <strong class="text-lg font-semibold">{activeChat?.name}</strong>
    </p>
    <div class="modal-action">
      <button class="btn btn-outline btn-xs btn-error" data-exclude-outside-click="true"
        on:click={() => { deleteChat() }}
        >
        <Icon icon="ion:trash" class="text-error"></Icon>
        Delete
      </button>
      <button class="btn btn-outline btn-xs"
        on:click={() => { showDeleteConfirmModal = false }}
        >
        <Icon icon="material-symbols:close" class=""></Icon>
        Close
      </button>
    </div>
  </form>
</dialog>


