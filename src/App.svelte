<script>
    import SourcesList from './SourcesList.svelte';

    import { createSource } from './utils';

    let sourcesList = [
        createSource([
            createSource(),
            createSource(),
            createSource(),
            createSource(),
        ]),
        createSource(),
        createSource(),
        createSource(),
    ];

    console.log(sourcesList);
</script>

<style>
    .app {
        padding: 20px;
    }
</style>

<div class="app">
    <SourcesList {sourcesList} />
</div>
