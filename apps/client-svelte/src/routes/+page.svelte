<script lang="ts">
  import { userService } from "$apis";
  import { session } from "$stores/session";
  import { log } from "$utils/log";

  let referralCodes :Array<any> = []

  async function createReferral() {
    if(!$session.user) return log.layout("user not login")
    const ret = await userService.createReferral($session.user)
    if(ret.isSuccess) {
      referralCodes = ret.data
      log.layout("create referral success")
    }else{
      log.layout("create referral failed")
    }
  }


</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<main class="h-full flex justify-center items-center flex-col gap-2">
  <button class="btn glass" on:click={createReferral}>
    create a referral code
  </button>

  <div class="flex flex-col items-center">
    <h1 class="text-xl font-bold">Referral Codes</h1>
    <div class="flex flex-col items-center">
      {#each referralCodes as code}
        <div class="text-xl">{code.code}</div>
      {/each}
    </div>
  </div>

</main>
