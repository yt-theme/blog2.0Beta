<template>
    <div v-if="this.$store.state.sidebarPopShow" class="sidebarPop_container">
        <i class="close" @click="closePop"></i>
        <div class="body">
            <template v-if="titleTop">
                <h1>{{ titleTop }}</h1>
            </template>
            <div class="content_container">
                <ul>
                    <li v-for="i in this.$store.state.sidebarPopData['content']">
                        {{i}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closePop () {
            // sidebarPop show
            this.$store.dispatch('toggleSidebarPop', false)
        }
    },
    computed: {
        titleTop () {
            let id = this.$store.state.sidebarPopData['id']
            switch (id) {
                case 'num0':
                    return 'Update History'
                    break;
                case 'num1':
                    return 'New Article'
                    break;
                case 'num2':
                    return 'Article History'
                    break;
                case 'num3':
                    return 'New Note'
                    break;
                case 'num4':
                    return 'Note History'
                    break;            
                default:
                    break;
            }
        }
    }
}
</script>

<style scoped>
.sidebarPop_container {
    position: absolute;
    top: 20%;
    left: 15%;
    width: 70vw;
    min-width: 400px;
    height: 60vh;
    min-height: 300px;
    background-color: #113337;
    border-radius: 4px;
    box-shadow: 0 0 14px #113337;
}
.close {
    position: absolute;
    top: -17px;
    right: -18px;
    width: 31px;
    height: 31px;
    box-shadow: 0 0 14px #113337; 
    border-radius: 50%;
    background-color: #489799;
    cursor: pointer;
}
.close:before {
    position: absolute;
    top: calc(50% - 1px);
    left: 0;
    content: '';
    width: 100%;
    height: 2px;
    background-color: #113337;

}
.close:hover {
    transform: rotate(180deg);
    transition: all 0.4s;
    box-shadow: 0 0 2em #bb7570;
}
.body {
    padding: 20px;
    text-shadow: 0 0 14px #B0B6B6;
}
.body> h1 {
    margin: 0 20px;
}
.content_container {
    position: absolute;
    padding: 20px;
    height: calc(100% - 73px);
    overflow: auto;
}
.content_container ul {
    list-style: none
}
.content_container ul> li {
    width: 100%;
    line-height: 1.5;
    border-bottom: 1px solid #B0B6B6;
    word-wrap: break-word;
    word-break: break-all;
    margin-bottom: 11px;
}
</style>
