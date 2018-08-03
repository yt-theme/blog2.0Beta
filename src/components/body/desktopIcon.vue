<template>
    <div v-if="this.$store.state.setDesktopLayout == 0" class="desktopIcon_container_list" @click="addWindow(label,id)" :href="url">
        <img :src="img ? img : defaultImgUrl"/>
        <span>{{label}}</span>
        <span>{{date}}</span>
    </div>
    <div v-else-if="this.$store.state.setDesktopLayout == 1" class="desktopIcon_container" @click="addWindow(label,id)" :href="url" :title="date">
        <img :src="img ? img : defaultImgUrl"/>
        <span>{{label}}</span>
    </div>
</template>

<script>
import defaultImg from "@/assets/tux.svg"
export default {
    props: ['label', 'img', 'url', 'id',  'date'],
    data () {
        return {
            defaultImgUrl: defaultImg
        }
    },
    methods: {
        addWindow (label, id) {
            // reset window data
            // this.$store.dispatch('addchangeWindowDataKey', id)
            // update data
            // this.$store.commit('requestWindowContent', this.id)
            this.$store.dispatch('requestWindowContent', id)
            
            let obj = {
                'component': 'window',
                'label': label,
                'id': id
            }
            
            // this.$store.commit('addWindow', obj)
            this.$store.dispatch('addWindow', obj)
        }
    }
}
</script>

<style>
@keyframes desktopIconShadow {
    0% {box-shadow: 0 0 7px #113337;background-color: #113034;}
    15% {box-shadow: 0 0 27px #B0B6B6;background-color: #113034;}
    25% {box-shadow: 0 0 27px #B0B6B6;background-color: #113034;}
    50% {box-shadow: 0 0 27px #B0B6B6; background-color: #113034;}
    100% {box-shadow: 0 0 7px #113337;background-color: #113034;}
}
.desktopIcon_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 130px;
    height: 130px;
    color: #B0B6B6;
    outline: none;
    text-decoration: none;
    border-radius: 4px;
    box-shadow: 0 0 120px #113034 inset, 0 0 6px #489799;
    margin: 10px;
    cursor: pointer;
}
.desktopIcon_container_list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
}
.desktopIcon_container_list> img {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 39px;
    height: 39px;
    color: #B0B6B6;
    outline: none;
    text-decoration: none;
    border-radius: 4px;
    box-shadow: 0 0 120px #113034 inset, 0 0 6px #489799;
    margin: 10px;
    margin-bottom: 15px;
    padding: 3px;
    cursor: pointer;
}
.desktopIcon_container_list> span {
    text-shadow: 0 0 14px #B0B6B6;
}
.desktopIcon_container_list> span:nth-child(2) {
    min-width: 130px;
    margin-left: 11px;
}
.desktopIcon_container_list> span:nth-child(3) {
    width: unset;
}
.desktopIcon_container:hover {
    animation: desktopIconShadow 1s infinite;
}
.desktopIcon_container> img {
    width: 75px;
    height: 75px;
    margin-top: 14.1px;
}
.desktopIcon_container> span {
    height: 32px;
    text-shadow: 0 0 14px #B0B6B6;
    text-align: center;
    padding: 6px;
    margin-bottom: 6px;
}
</style>
