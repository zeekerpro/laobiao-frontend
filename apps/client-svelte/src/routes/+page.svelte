<script lang="ts">
  import Referral from "$models/Referral";
  import { session } from "$stores/session";
  import { log } from "$utils/log";
  import { onMount } from "svelte";
  import { afterNavigate } from "$app/navigation";
  import PageTransition from "$components/layout/PageTransition.svelte";

  let referrals :Array<Referral> = []

  let isLoadingReferral = true

  async function createReferral() {
    if(!$session.user) return log.layout("user not login")
    const ret = await Referral.create()
    if(ret.isSuccess) {
      referrals = ret.data
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
    isLoadingReferral = false
  }

  onMount(async () => {
    console.log("index page onmount....")
    getReferrals()
  })

</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<PageTransition>
<main class="flex justify-center items-center flex-col gap-2">
  <button class="btn glass" on:click={createReferral} >
    <span class="loading loading-spinner"></span>
    create a referral code
  </button>

  <div class="flex flex-col items-center">
    <h1 class="text-xl font-bold">Referral Codes</h1>
    {#if isLoadingReferral }
      <span class="loading loading-ring loading-lg"> loading referrals </span>
    {:else}
      <div class="flex flex-col items-center">
        {#each referrals as referral}
          <div class="text-xl">{referral.code}</div>
        {/each}
      </div>
    {/if}
  </div>
</main>
</PageTransition>
