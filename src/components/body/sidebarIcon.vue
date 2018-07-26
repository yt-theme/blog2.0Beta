<template>
    <a class="sidebarIcon_container" :href="url" target="_blank">
        <img :src="img"/>
        <span>{{label}}</span>
    </a>
</template>

<script>
export default {
    props: ['url', 'label', 'img']
}
</script>

<style scoped>
    .sidebarIcon_container {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #B0B6B6;
        text-decoration: none;    
        height: 30px;
        outline: none;
        border-radius: 4px;
        box-shadow: 0 0 60px #113236 inset;
        margin-right: 10px;
        margin-top: 10px;
        padding: 0 1em;
    }
</style>
