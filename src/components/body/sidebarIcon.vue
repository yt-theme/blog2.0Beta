<template>
    <a class="sidebarIcon_container" :href="url" target="_blank">
        <img :src="img"/>
        <span>{{label}}</span>
    </a>
</template>

<script>
export default {
    props: ['url', 'label', 'src']
}
</script>

<style scoped>
    .sidebarIcon_container {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #B0B6B6;
        text-decoration: none;    
        width: 80px;
        height: 80px;
        line-height: 80px;
        border-radius: 4px;
        box-shadow: 0 0 80px #113236 inset;
        margin: 20px;
        padding: 4px 20px;
    }
</style>
