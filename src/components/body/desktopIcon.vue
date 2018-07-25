<template>
    <div class="desktopIcon_container" :href="url">
        <img :src="img"/>
        <span>{{label}}</span>
    </div>
</template>

<script>
export default {
    props: ['label', 'img', 'url'],
}
</script>

<style>
.desktopIcon_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 120px;
    height: 120px;
    color: #B0B6B6;
    outline: none;
    text-decoration: none;
    border-radius: 4px;
    box-shadow: 0 0 120px #113034 inset, 0 0 6px #489799;
    margin: 10px;
    cursor: pointer;
}
.desktopIcon_container> img {
    height: 87px;
}
.desktopIcon_container> span {
    height: 32px;
    text-shadow: 0 0 14px #B0B6B6;
    text-align: center;
    padding: 6px;
}
</style>
