<script lang="ts">
  import OpenaiAccount from "$models/OpenaiAccount.js";
  import Icon from "@iconify/svelte"
  import { onMount } from "svelte";
  import AccountEditor from "$components/views/dashboard/integrations/openai/AccountEditor.svelte"
  import { dateFormatter } from "$utils/formatter";

  let accounts :Array<OpenaiAccount> = []

  async function loadAccounts() {
    const ret = await OpenaiAccount.index();
    if(ret.isSuccess){
      accounts = ret.data;
    }
  }

  onMount(() => {
    loadAccounts();
  })

</script>

<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th></th>
        <th>account</th>
        <th>created at</th>
      </tr>
    </thead>
    <tbody>
      {#each accounts  as account (account.id) }
      <tr class="hover">
        <th>{account.id}</th>
        <td>{account.email}</td>
        <td>{ dateFormatter()(account.created_at)}</td>
      </tr>
      {/each}
    </tbody>
  </table>
  <button
    class="btn glass btn-sm mx-auto w-full my-1"
    onclick="openaiAccountEditor.showModal()"
    >
   <Icon class="h-8 w-8" icon="material-symbols:add" />
  </button>
</div>

<dialog id="openaiAccountEditor" class="modal">
  <form method="dialog" class="modal-box">
    <AccountEditor />
  </form>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
