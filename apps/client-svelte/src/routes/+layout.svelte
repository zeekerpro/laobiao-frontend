<script lang="ts">
  import "$styles/app.css";
  import AppContainer from "$components/layout/AppContainer.svelte";
  import { guard, follow } from "$utils/client/routeMonitor";
  import { beforeNavigate, afterNavigate } from "$app/navigation";

  // 1. Guard the route change and prevent it if needed (e.g. user is not logged in)
  // 2. Follow the route change and perform any side effects (e.g. scroll to top, maintain view stack)
  beforeNavigate(guard)
  afterNavigate(follow)

</script>

<AppContainer>
  <slot></slot>
</AppContainer>


