<script>
  import LogoAnimation from "$components/layout/LogoAnimation.svelte";
  import ThemeSwitcher from "$components/layout/ThemeSwitcher.svelte";
  import TabsLayouter from "$components/layout/tabs/TabsLayouter.svelte";
  import { onMount } from "svelte";
  import { session, isLoggedIn } from "$stores/session";
  import { log } from "$utils/log";
  import { goto } from "$app/navigation";
  import User from "$models/User";
  import { authWhiteList } from "$configs";
  import { page } from "$app/stores";

  export let isLoading = true;

  async function checkIsSigned() {
    isLoading = true
    // check signed status at first open page
    if(authWhiteList.includes($page.route.id || "")) { isLoading = false; return }
    if(!$isLoggedIn) {
      const ret = await User.me()
      if(ret.isSuccess) {
        log.layout("signed success by token")
        $session.user = ret.data
      }else{
        log.layout("unsigned, goto signin page")
        isLoading = false
        goto("/signin")
      }
    }
    isLoading = false
  }

  onMount(() => {
    checkIsSigned()
  })

</script>

<div class="flow-root overflow-hidden scrollbar-hide">
{#if isLoading}
  <ThemeSwitcher class="fixed-silky top-3 right-3" />
  <LogoAnimation class="h-screen flex justify-center" dancing={true} />
{:else}
  {#if $isLoggedIn}
    <TabsLayouter><slot></slot></TabsLayouter>
  {:else}
    <slot></slot>
  {/if}
{/if}
</div>
