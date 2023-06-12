<script lang="ts">
  import "$styles/app.css";
  import Preloading from "$components/layout/Preloading.svelte";
  import PageTransition from "$components/layout/PageTransition.svelte";
  import MainContent from "$components/layout/MainContent.svelte";
  import { authWhiteList } from "$configs";
  import { guard } from "$utils/client/routeMonitor";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { session, isLoggedIn } from "$stores/session";
  import { log } from "$utils/log";
  import { beforeNavigate, goto } from "$app/navigation";
  import User from "$models/User";

  let isLoading = true

  $: isAuthPage = $page.route.id && authWhiteList.includes($page.route.id)

  beforeNavigate(guard)

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

  {#if isLoading}
    <Preloading />
  {/if}

  {#if isAuthPage}
    <PageTransition>
      <slot></slot>
    </PageTransition>
  {:else}
    <MainContent >
      <slot></slot>
    </MainContent>
  {/if}

</div>
