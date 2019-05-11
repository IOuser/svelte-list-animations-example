<script>
    import SourcesList from './SourcesList.svelte';

    import { createSource } from './utils';

    let sourcesList = [
        createSource([
            createSource(),
            createSource(),
            createSource(),
            createSource(),
            createSource(),
            createSource(),
        ]),
        createSource(),
        createSource(),
        createSource(),
        createSource(),
        createSource(),
        createSource(),
    ];

    console.log(sourcesList);
</script>

<style>
    .app {
        margin: 20px;
        padding: 20px;
        width: 390px;
        box-shadow: 2px 3px 15px rgba(0, 0, 0, 0.05);
        background-color: #fff;
        border-radius: 3px;
        min-height: calc(100vh - 40px);
    }
</style>

<div class="app">
    <SourcesList {sourcesList} />
</div>
