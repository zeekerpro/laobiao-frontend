<script lang="ts">
  import Referral from "$models/Referral";
  import { session } from "$stores/session";
    import { dateFormatter } from "$utils/formatter";
  import { log } from "$utils/log";
  import { onMount } from "svelte";

  let referrals :Array<Referral> = []

  let isLoading = true

  async function createReferral() {
    if(!$session.user) return log.layout("user not login")
    const ret = await Referral.create()
    if(ret.isSuccess) {
      const newReferral = ret.data
      referrals = [newReferral, ...referrals]
      log.layout("create referral success")
    }else{
      log.layout("create referral failed")
    }
  }

  async function getReferrals() {
    console.log("get referrals")
    const ret = await Referral.index()
    if(ret.isSuccess) {
      referrals = ret.data
    }else{
      log.layout("get referrals failed")
    }
    isLoading = false
  }

  onMount(async () => {
    console.log("index page onmount....")
    getReferrals()
  })
</script>

<svelte:head>
  <title>Referrals</title>
</svelte:head>

<main class="flex justify-center items-center flex-col gap-2">
  <button class="btn" on:click={createReferral} >
    {#if isLoading } <span class="loading loading-spinner"></span> {/if}
    create a referral code
  </button>

  {#if isLoading }
    <span class="loading loading-ring loading-lg"> loading referrals </span>
  {:else}
    <div class="overflow-x-auto">
      <table class="table min-w-full">
        <tbody>
          {#each referrals as referral}
          {#if referral.isUsed}
            <tr>
              <th>{referral.referred.username}</th>
              <td>{ dateFormatter()(referral.referred.created_at) }</td>
            </tr>
          {:else}
            <tr>
              <th>{referral.code}</th>
            </tr>
          {/if}
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
</main>
