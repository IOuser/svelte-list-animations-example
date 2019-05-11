<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let source;
    export let active;

    $: percetage = `${source.value}%`;

    function handleClick() {
        dispatch(active ? 'deactivate' : 'activate', { source })
    }
</script>

<style>
    .source {
        position: relative;
        display: flex;
        overflow: hidden;
        border-radius: 3px;
        width: 100%;
        height: 50px;
        cursor: pointer;
    }

    .source::before {
        z-index: -1;
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 3px;
        background-color: #fcfcfc;
        border: 1px solid #eee;
        transition: background-color ease-in-out 200ms, border-color ease-in-out 200ms;
    }

    .source-value {
        display: flex;
        align-items: center;
        width: 50px;
        padding: 10px;
        color: #333;
        transition: color ease-in-out 200ms;
        font-weight: 600;
        font-size: 14px;
    }

    .source-name {
        display: flex;
        align-items: center;
        color: #333;
        transition: color ease-in-out 200ms;
    }

    .source-percentage {
        position: absolute;
        height: 2px;
        left: 0;
        bottom: 0;
        max-width: 100%;
        background: #e33;
    }

    .source.active::before {
        background-color: #444;
        border-color: #444;
        transition-duration: 60ms, 60ms;
    }

    .source.active .source-value,
    .source.active .source-name {
        color: #fff;
        transition-duration: 60ms;
    }
</style>

<div class="source" class:active={active} on:click={handleClick}>
    <div class="source-value">{percetage}</div>
    <div class="source-percentage" style="width: {percetage}" />
    <div class="source-name">{source.name}</div>
</div>
