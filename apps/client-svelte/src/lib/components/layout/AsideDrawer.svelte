<script lang="ts">
  import Icon from "@iconify/svelte"
  import { session } from "$stores/session"
  import { sidemenus } from "$configs";
  import { goto, invalidateAll } from "$app/navigation";
  import { isOpenAside  } from "$stores/layouts";
  import { onMount, tick } from "svelte";
  import { browser } from "$app/environment";

  let classes = ''
  export { classes as class }

  let asideRef: HTMLElement
  let gesture :HammerManager;

  async function supportGesture(){
    if(!browser) return
    if(!window.Hammer){ await import("hammerjs") }
    gesture = new Hammer(asideRef)
    gesture.get('swipe').set({ direction: Hammer.DIRECTION_LEFT, threshold: 5, velocity: 0.1 });
    gesture.on('swipe', () => {
      isOpenAside.set(false)
    })
  }

  async function handleSignout(){
    await $session.user.signout()
    // goto("/signin", {replaceState: true, invalidateAll: true})
    window.location.href = "/signin"
  }

  onMount(() => {
    supportGesture()
  })

</script>

<div class="drawer {classes}">

  <input id="side-toggle" type="checkbox" class="drawer-toggle" bind:checked={$isOpenAside} />

  <div class="drawer-content">
    <label for="side-toggle" class="text-2xl">
      {#key $isOpenAside}
        <Icon icon="line-md:close-to-menu-alt-transition" ></Icon>
      {/key}
    </label>
  </div>

  <div class="drawer-side duration-500">
    <label for="side-toggle" class="drawer-overlay"></label>

    <!-- side menus here -->
    <aside class="p-4 w-80 h-screen bg-base-100 text-base-content relative" bind:this={asideRef}>
      <a href="/" class="btn btn-ghost btn-sm rounded-btn
        flex pb-10
        shadow-[0_1px_2px_-2px_hsl(var(--inc))]
        ">
        <Icon icon="radix-icons:avatar" class="w-6 h-6" />
        <span>{$session.user.username} </span>
        <Icon icon="line-md:arrow-right" class="text-lg" />
      </a>

      <ul class="menu mt-8 flex gap-2">
      {#each sidemenus as sidemenu}
        <li>
          <button
            class="text-lg font-medium capitalize"
            on:click={() => { goto(sidemenu.path)} }
            >
            <Icon icon="{sidemenu.icon}" class="text-2xl mr-3" />
            <span> {sidemenu.label} </span>
            <Icon icon="icon-park-outline:right" class="text-xl" />
          </button>
        </li>
      {/each}
      </ul>

      <button
        on:click={handleSignout}
        class="btn rounded-btn absolute bottom-0 left-0 right-0 mx-2 my-2 shadow"
        >
        <Icon icon="ic:sharp-logout" class="text-2xl" />
      </button>

    </aside>


    </div>
</div>
