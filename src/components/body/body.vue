<template>
    <div class="body_container">
        <Desktop></Desktop>
        <Sidebar></Sidebar>
    </div>
</template>

<script>
import Desktop from './desktop'
import Sidebar from './sidebar'
export default {
    components: {
        Desktop,
        Sidebar
    }
}
</script>

<style>
.body_container {
    display: flex;
    align-items: center;
    color: #B0B6B6;
    width: 100vw;
    height: calc(100vh - 33px);
}
</style>
