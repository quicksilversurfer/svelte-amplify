<script>
  import "../app.css";
  let { children } = $props();
  import AmplifyInit from "$lib/components/AmplifyInit.svelte";
  import outputs from "../../amplify_outputs.json";
</script>

<AmplifyInit {outputs} />
{@render children()}
