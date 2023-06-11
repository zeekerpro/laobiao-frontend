<script lang="ts">
  import {onMount} from "svelte";
  import { themeChange } from "theme-change";
  import theme from "$stores/theme";
  import Icon from "@iconify/svelte"

  let classes = ''
  export {classes as class}

  let isDark = true;
  let dataToggleTheme = isDark ? "dark,light" : "light,dark";

  $: themeBgColor = isDark ? "#0F172A" : "white";

  onMount(async () => {
    // true: theme just based on system settings
    // false: theme based on user settings
    themeChange(false)
    const { appStorage } = await import("$utils/client/storage");
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

<label class="swap swap-rotate {classes} text-2xl">

  <!-- this hidden checkbox controls the state -->
  <input type="checkbox" data-toggle-theme={dataToggleTheme} checked={isDark} on:change={handleChangeTheme} />

  <Icon class="swap-on text-[#ffb62e]" icon="line-md:sunny-outline-to-moon-loop-transition" />
  <Icon class="swap-off text-[#ffd22e]" icon="line-md:moon-to-sunny-outline-loop-transition" />

</label>
