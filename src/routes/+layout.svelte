<script>
    import "../app.css";
    let { children } = $props();
    import { Amplify } from 'aws-amplify';
    import outputs from '@/amplify_outputs.json';

    Amplify.configure(outputs, { ssr: true });
</script>

{@render children()}