<template>
    <div class="actionButtonArea_container">
        <img :src="iconIcon" @click="changeDesktopLayout(1)"/>
        <img :src="listIcon" @click="changeDesktopLayout(0)"/>
    </div>
</template>

<script>
import listIcon from '@/assets/listMode.svg'
import iconIcon from '@/assets/iconMode.svg'
export default {
    data () {
        return {
            listIcon: listIcon,
            iconIcon: iconIcon
        }
    },
    methods: {
        changeDesktopLayout (type) {
            this.$store.dispatch('changeDesktopLayout', type)
        }
    }
}
</script>

<style scoped>
.actionButtonArea_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 77px;
    border-radius: 4px;
    background-color: #666;
    box-shadow: 0 0 3px #B0B6B6 inset; 
    padding:  3px 11px;
}
.actionButtonArea_container> img {
    width: 17px;
    height: 17px;
    cursor: pointer;
}
</style>
