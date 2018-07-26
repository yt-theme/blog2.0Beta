<template>
    <div class="body_container">
        <div class="test" @click="addWindow"></div>
        <Desktop></Desktop>
        <Sidebar></Sidebar>
        <component v-for="i in this.$store.state.windowItem" :is="i.component" :label="i.label"></component>
    </div>
</template>

<script>
import Desktop from './desktop'
import Sidebar from './sidebar'
import window from './window'
export default {
    components: {
        Desktop,
        Sidebar,
        window
    },
    data () {
        return {
            // windowItem: []
        }
    },
    methods: {
        addWindow (name, label) {
            // this.windowItem.push({
            //     component: name,
            //     label: label
            // })
            // console.log(this.windowItem)
            this.$store.commit('addWindow','window')
        }
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
.test {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #666;
}
</style>
