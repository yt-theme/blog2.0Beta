<template>
    <div class="desktop_container">
        <DesktopIcon v-for="i in this.$store.state.desktopIconList" :label="i.label" :img="i.img" :url="i.url"></DesktopIcon>
    </div>
</template>

<script>
import DesktopIcon from './desktopIcon'
export default {
    components: {
        DesktopIcon
    },
    created () {
        this.$store.commit('requestDesktopIconList')
    }
}
</script>

<style>
.desktop_container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: calc(90vw - 10px);
    min-width: 900px;
    height: calc(100vh - 53px);
    margin-left: 10px;
    border-radius: 4px;
    background-color: rgba(176,182,182,0.3);
    padding: 10px;
    overflow: auto;
}
</style>
