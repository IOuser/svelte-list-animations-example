<script>
    import { quintOut } from 'svelte/easing';
    import { fade, crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    import Source from './Source.svelte';
    import SourceActions from './SourceActions.svelte';

    import { isActive } from './utils';

    export let sourcesList;

    let activeSourceId = null;

    function activate({ detail }) {
        activeSourceId = detail.source.id;
    }

    function deactivate({ detail }) {
        activeSourceId = null;

        if (detail.source.parentId) {
            activeSourceId = detail.source.parentId;
        }
    }


    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 200),

        fallback(node, params) {
            return {
                duration: 600,
                easing: quintOut,
                css: t => `
                    opacity: ${t}
                `
            };
        }
    });
</script>

<style>
    .sources-list {
        max-width: 390px;
        user-select: none;
    }

    .sources-list > :not(:last-child) {
        margin-bottom: 10px;
    }

    .sources-list .sources-list {
        margin-top: 10px;
        margin-left: 10px;
    }
</style>

<div class="sources-list">
    {#each sourcesList as source (source.id)}
        <div
            in:receive={{ key: source.id }}
            out:send={{ key: source.id }}
            animate:flip={{ duration: 200 }}
        >
            <Source
                {source}
                active={isActive(source, activeSourceId)}
                on:activate={activate}
                on:deactivate={deactivate}
            />
            {#if isActive(source, activeSourceId)}
                <div in:fade={{ duration: 200 }}>
                    <SourceActions />

                    {#if source.children && source.children.length }
                        <div class="sources-list">
                            {#each source.children as childSource (childSource.id)}
                                <div
                                    in:receive={{ key: childSource.id }}
                                    out:send={{ key: childSource.id }}
                                    animate:flip={{ duration: 200 }}
                                >
                                    <Source
                                        source={childSource}
                                        active={isActive(childSource, activeSourceId)}
                                        on:activate={activate}
                                        on:deactivate={deactivate}
                                    />
                                    {#if isActive(childSource, activeSourceId)}
                                        <div in:fade={{ duration: 200 }}>
                                            <SourceActions />
                                        </div>
                                    {/if}
                                </div>
                            {/each}
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    {/each}
</div>
