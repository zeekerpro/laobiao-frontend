<script lang="ts">

  let classes = ''
  export { classes as class }

  export let dancing = false

  let logoText = "LaoBiao..."

</script>

<div class="{classes}">
  <section class="logo flex items-center justify-center gap-2 font-bold ">
    <img src="/images/logo.png" class="h-12 {dancing ? 'wave' : ''}" alt="logo" style="--order: 1;" />
    <span class="
      text-3xl italic tracking-widest
      { dancing ? '' : 'bg-gradient-animate bg-gradient-to-r from-purple-500 via-emerald-500 to-sky-500 bg-clip-text text-transparent ' }
      ">
      {#each logoText.split("") as letter, index}
        <span class="tracking-wider {dancing ? 'wave' : ''}" style="--order: {index + 1}">{letter}</span>
      {/each}
    </span>
  </section>
</div>

<style>

.bg-gradient-animate {
	background-size: 300% 300%;
	animation: gradient-x 2.5s ease-in-out infinite;
}

@keyframes gradient-x {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.wave {
  display: inline-block;
  animation: wave-letter 1s ease-in-out infinite;
  animation-delay: calc((var(--order)) * 0.1s);
}

@keyframes wave-letter {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>



