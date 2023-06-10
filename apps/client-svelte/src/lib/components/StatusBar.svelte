<script lang="ts">
  import "$styles/app.css";
  import LogoAnimation from "$components/LogoAnimation.svelte";

  let classes = ''; export { classes as class };

</script>

<div class="{classes} fixed top-0 flex justify-between items-center w-full" >
  <LogoAnimation class="w-full"/>
</div>
