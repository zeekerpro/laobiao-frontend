<script lang="ts">
import LogoAnimation from "@components/LogoAnimation.svelte";
</script>

<section class=" mt-16 md:mt-24 " >
  <LogoAnimation class="sticky top-0 w-full"/>
  <div class=" sm:max-w-md mx-auto ">
    <slot></slot>
  </div>
</section>
