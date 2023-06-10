<script lang="ts">
  import "$styles/app.css";
  import PageTransition from "$components/PageTransition.svelte";
  import { navigating } from "$app/stores";
  import { authWhiteList } from "$configs";
  import { guard } from "$utils/client/routeMonitor";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { session, isLoggedIn } from "$stores/session";
  import { userService } from "$apis";
  import { log } from "$utils/log";
  import { goto } from "$app/navigation";
  import LogoAnimation from "$components/LogoAnimation.svelte";
  import ThemeSwitcher from "$components/ThemeSwitcher.svelte";
  import StatusBar from "$components/StatusBar.svelte";
  import TabBar from "$components/TabBar.svelte";

  let isLoading = true

  $: isAuthPage = $page.route.id && authWhiteList.includes($page.route.id)

  // route guard
  $: if($navigating) { guard($navigating, authWhiteList) }

  async function checkIsSigned() {
    isLoading = true
    // check signed status at first open page
    if(authWhiteList.includes($page.route.id || "")) { isLoading = false; return }
    if(!$isLoggedIn) {
      const ret = await userService.me()
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
      <StatusBar class="h-16" />
      <main class="h-screen pt-16 pb-24">
        <div class="h-full overflow-scroll">
          <PageTransition class="h-full">
            <slot></slot>
          </PageTransition>
        </div>
      </main>
      <TabBar class="h-24" />
    {/if}
  {:else}
    <LogoAnimation class="h-screen flex justify-center" dancing={true} />
  {/if }

  <ThemeSwitcher class="fixed right-4 top-2 z-10" />

</div>
