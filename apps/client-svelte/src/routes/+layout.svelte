<script lang="ts">
  import "@styles/app.css";
  import ThemeSwitcher from "@components/ThemeSwitcher.svelte";
  import PageTransition from "@components/PageTransition.svelte";
  import { navigating } from "$app/stores";
  import config  from "./config.json";
  import { guard } from "@utils/client/routeMonitor";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { session, isLoggedIn } from "@stores/session";
  import { userService } from "@apis";
  import { log } from "@utils/log";
  import { goto } from "$app/navigation";
    import LogoAnimation from "@components/LogoAnimation.svelte";

  let isLoading = true

  // route guard
  $: if($navigating) {
    // @ts-ignore
    guard($navigating, config.authWhiteList)
  }

  async function checkIsSigned() {
    isLoading = true
    // check signed status at first open page
    if(config.authWhiteList.includes($page.route.id || "")) { isLoading = false; return }
    if(!$isLoggedIn) {
      const ret = await userService.me()
      if(ret.isSuccess) {
        log.layout("signed success by token")
        $session.user = ret.data
        isLoading = false
      }else{
        log.layout("unsigned, goto signin page")
        isLoading = false
        goto("/signin")
      }
    }
  }

  onMount(() => {
    checkIsSigned()
  })

</script>

<main class="flow-root">

  {#if !isLoading }
  <section>
    <PageTransition>
      <slot></slot>
    </PageTransition>
  </section>
  {:else}
    <LogoAnimation class="h-screen flex justify-center" dancing={true} />
  {/if }

</main>
