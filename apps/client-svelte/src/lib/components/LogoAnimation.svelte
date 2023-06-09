<script lang="ts">
  import { onMount } from "svelte";
  const { throttle } = lodash;
  import lodash from "lodash";
  import theme from "@stores/theme";

  let classes = ''

  export { classes as class }

  export let dancing = false

  let logoText = "LaoBiao..."

  let dom: HTMLElement | null = null

  let borderColor :string;

  const handleScroll = throttle( async () => {
    borderColor = $theme == "dark" ? "border-primary" : "border-neutral-focus"
    const logoTop = dom?.getBoundingClientRect().top || 0
    if (logoTop < 1) {
      dom?.classList.add("after:border-b");
    }else{
      dom?.classList.remove("after:border-b");
    }
  }, 200)

  onMount(async () => {
    window.addEventListener("scroll", handleScroll);
  })

</script>

<div bind:this={dom} class="{classes}
  bg-base-100 py-2
  bg-opacity-95
  after:content-[''] after:block after:h-px after:pb-2 after:{borderColor}
  "
  >
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



