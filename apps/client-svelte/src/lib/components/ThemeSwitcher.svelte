<script lang="ts">
  import {onMount} from "svelte";
  import { themeChange } from "theme-change";
  import theme from "@stores/theme";
  import Icon from "@iconify/svelte"

  let classes = ''
  export {classes as class}

  let isDark = false;

  $: themeBgColor = isDark ? "#0F172A" : "white";

  onMount(async () => {
    // true: theme just based on system settings
    // false: theme based on user settings
    themeChange(false)
    const { appStorage } = await import("@utils/client/storage");
    $theme = appStorage.theme || "light";
    isDark = $theme === "dark";
  })

  function handleChangeTheme(){
    isDark = !isDark;
    $theme = isDark ? "dark" : "light";
  }

</script>

<svelte:head>
  <!-- <meta name="theme-color" media="(prefers-color-scheme: light)" content="white"> -->
  <!-- <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0F172A"> -->
  <meta name="theme-color" content={themeBgColor}>
</svelte:head>

{ isDark }

<div class="{classes}">
  <button data-toggle-theme="dark,light" class="text-3xl my-1" on:click={handleChangeTheme}>
    {#if isDark }
      <Icon icon="line-md:sunny-outline-to-moon-loop-transition" class="text-[#ffb62e]" />
    {:else}
      <Icon icon="line-md:moon-to-sunny-outline-loop-transition" class="text-[#ffd22e]" />
    {/if}
  </button>
</div>
