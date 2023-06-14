<script lang="ts">
  import "$styles/app.css";
  import AppContainer from "$components/layout/AppContainer.svelte";
  import { guard } from "$utils/client/routeMonitor";
  import { beforeNavigate } from "$app/navigation";

  beforeNavigate(guard)
</script>

<AppContainer>
<slot></slot>
</AppContainer>


