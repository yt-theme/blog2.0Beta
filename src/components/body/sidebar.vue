<template>
    <div class="sidebar_container">
        <ul class="sidebar_nav_container">
            <li><a>Update History</a></li>
            <li><a>New Article</a></li>
            <li><a>Article History</a></li>
            <li><a>New Note</a></li>
            <li><a>Note History</a></li>
        </ul>
        <div class="sidebarIcon_list">
            <SidebarIcon v-for="i in this.$store.state.sidebarIconList" :label="i.label" :img="i.img" :url="i.url" ></SidebarIcon>
        </div>
    </div>
</template>

<script>
import SidebarIcon from './sidebarIcon'
export default {
    components: {
        SidebarIcon
    },
    created () {
        this.$store.commit('requestSidebarIconList')
    }
}
</script>

<style scoped>
.sidebar_container {
    width: calc(10vw - 20px);
    min-width: 309px;
    height: calc(100vh - 53px);
    margin-left: 10px;
    border-radius: 4px;
    background-color: rgba(176,182,182,0.3);
    padding: 10px;
}
.sidebar_container> ul> li {
    line-height: 3;
    margin-left: 1.8em;
}
.sidebar_container> ul> li> a {
    color: #B0B6B6;
    text-shadow: 0 0 5px #000;
}
.sidebar_nav_container {
    display: block;
    border-radius: 4px;
    box-shadow: 0 0 300px #789799 inset;
}
.sidebarIcon_list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    border-radius: 4px;
    margin-top: 30px;
    overflow: auto;
}
</style>
