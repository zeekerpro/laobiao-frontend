<script lang="ts">
  import "$styles/app.css";
  import AppContainer from "$components/layout/AppContainer.svelte";
  import { guard, follow } from "$utils/client/routeMonitor";
  import { beforeNavigate, afterNavigate } from "$app/navigation";

  beforeNavigate(guard)

  afterNavigate(follow)

</script>

<AppContainer>
  <slot></slot>
</AppContainer>


