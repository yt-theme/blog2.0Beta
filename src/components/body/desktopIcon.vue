<template>
    <div class="desktopIcon_container" @click="addWindow(label,id)" :href="url">
        <img :src="img ? img : defaultImgUrl"/>
        <span>{{label}}</span>
    </div>
</template>

<script>
import defaultImg from "@/assets/tux.svg"
export default {
    props: ['label', 'img', 'url', 'id'],
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
.desktopIcon_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
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
    width: 65px;
    height: 65px;
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
