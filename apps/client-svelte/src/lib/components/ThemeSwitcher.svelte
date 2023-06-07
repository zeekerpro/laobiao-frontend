<script lang="ts">
  import {onMount} from "svelte";
  import { themeChange } from "theme-change";
  import theme from "@stores/theme";

  let isChecked = false;

  $: themeColor = isChecked ? "white" : "#0F172A";

  let classes = ''
  export {classes as class}

  onMount(() => {
    // true: theme just based on system settings
    // false: theme based on user settings
    themeChange(false)
    isChecked = $theme === "light";
  })


</script>

<svelte:head>
  <!-- <meta name="theme-color" media="(prefers-color-scheme: light)" content="white"> -->
  <!-- <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0F172A"> -->
  <meta name="theme-color" content={themeColor}>
</svelte:head>

<div class="{classes}">
  <label class="theme-toggle cursor-pointer">
    <input class="hidden"
      type="checkbox"
      bind:checked={isChecked}
      data-toggle-theme="light,dark"
      />
    <span></span>
  </label>
</div>

<style lang="scss">
  $primary-color: #ffb62e;
  $secondary-color: #ffd22e;
  $size: 36px;

  .theme-toggle {
    transform: scale(0.6);
    display: block;

    input + span {
      display: block;
      border-radius: 100%;
      width: $size;
      height: $size;
      position: relative;
      box-shadow: inset 11px -11px $secondary-color;
      transform: scale(1) rotate(-2deg);
      transition: box-shadow .5s ease 0s, transform .4s ease .1s;

      &:before {
        content: "";
        width: inherit;
        height: inherit;
        border-radius: inherit;
        position: absolute;
        left: 0;
        top: 0;
        backface-visibility: hidden;
        transition: background-color .3s ease;
      }

      &:after {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 100%;
        margin: -4px 0 0 -4px;
        position: absolute;
        top: 50%;
        left: 50%;
        box-shadow: 0 -23px $primary-color, 0 23px $primary-color, 23px 0 $primary-color, -23px 0 $primary-color, 15px 15px $primary-color, -15px 15px $primary-color, 15px -15px $primary-color, -15px -15px $primary-color;
        transform: scale(0);
        transition: all .3s ease;
      }
    }

    input:checked + span {
      box-shadow: inset 32px -32px $secondary-color;
      transform: scale(.5) rotate(0);
      transition: transform .3s ease .1s, box-shadow .2s ease 0s;
      &:before {
        background: $primary-color;
        backface-visibility: hidden;
        transition: background-color .3s ease .1s;
      }
      &:after {
        transform: scale(1.5);
        transition: transform .5s ease .15s;
      }
    }

  }
</style>


