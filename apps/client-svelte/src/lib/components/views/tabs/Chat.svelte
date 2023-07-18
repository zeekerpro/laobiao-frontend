<script lang="ts">
  import TabTransition from "$components/layout/tabs/TabTransition.svelte";
  import OpenaiChat from "$models/OpenaiChat";
  import Icon from "@iconify/svelte"
  import { onMount } from "svelte";

  // let chats :Array<OpenaiChat> = []
  //
  // async function loadChats() {
  //   const ret = await OpenaiChat.index()
  //   if(ret.isSuccess){
  //     chats = ret.data
  //   }
  // }
  //
  // onMount(() => {
  //   loadChats()
  // })

</script>

<TabTransition>


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


