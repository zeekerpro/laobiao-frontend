<script lang="ts">
  import "$styles/app.css";
  import Preloading from "$components/layout/Preloading.svelte";
  import PageTransition from "$components/PageTransition.svelte";
  import { navigating } from "$app/stores";
  import { authWhiteList } from "$configs";
  import { guard } from "$utils/client/routeMonitor";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { session, isLoggedIn } from "$stores/session";
  import { log } from "$utils/log";
  import { goto } from "$app/navigation";
  import StatusBar from "$components/StatusBar.svelte";
  import TabBar from "$components/TabBar.svelte";
  import User from "$models/User";

  let isLoading = true

  $: isAuthPage = $page.route.id && authWhiteList.includes($page.route.id)

  // route guard
  $: if($navigating) { guard($navigating, authWhiteList) }

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

<div class="flow-root">

  {#if !isLoading }
    {#if isAuthPage}
      <PageTransition>
        <slot></slot>
      </PageTransition>
    {:else}
      <main class="h-screen pt-12 pb-24">
        <div class="h-full overflow-scroll">
          {#if $navigating}
          <div class="h-full flex justify-center items-center">
            <span class="loading loading-bars loading-md"></span>
          </div>
          {:else}
          <PageTransition class="h-full">
            <slot></slot>
          </PageTransition>
          {/if}
        </div>
      </main>
      <TabBar class="h-24" />
      <StatusBar class="h-12" />
    {/if}
  {:else}
    <Preloading />
  {/if }

</div>
