<script lang="ts">
  import TabTransition from "$components/layout/tabs/TabTransition.svelte";
  import Icon from "@iconify/svelte"
  import { activeTab } from "$stores/layouts";

  $: isChatTab = $activeTab?.label === 'chat';

</script>

<TabTransition>

this is chat page

<button class="btn btn-circle
  text-2xl bg-info
  transition-opacity duration-500
  { isChatTab ? 'opacity-100 fixed bottom-32 right-2 ' : 'opacity-0'}
  ">
  <Icon class="" icon="material-symbols:add" />
</button>

</TabTransition>


