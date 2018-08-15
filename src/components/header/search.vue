<template>
    <div class="search_container">
        <i></i>
        <input v-model="search_input_data" @keyup="inputKeyUp" 
            :class="[this.$store.state.search_input_data != '' ? activeStyle : normalStyle, normalStyle]" placeholder="Search"/>
    </div>
</template>

<script>
export default {
    data () {
        return {
            search_input_data: '',
            activeStyle: 'activeStyle',
            normalStyle: 'normalStyle'
        }
    },
    methods: {
        inputKeyUp(e) {
            let dat = this.search_input_data
            this.$store.dispatch('change_search_input_data', dat)
            setTimeout(
                () => {this.$store.dispatch('request_search', dat)}
            , 400)
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
@keyframes sidebarIconShadow {
    0% {box-shadow: 0 0 27px #ebd15f inset,0 0 27px #29814b inset;}
    25% {box-shadow: 0 0 27px #29814b inset,0 0 27px #ebd15f inset;}
    50% {box-shadow: 0 0 27px #B0B6B6 inset,0 0 27px #29814b inset;}
    75% {box-shadow: 0 0 27px #29814b inset,0 0 27px #ebd15f inset;}
    100% {box-shadow: 0 0 27px #ebd15f inset,0 0 27px #29814b inset;}
}
.search_container {

}
.search_container> input, .normalStyle {
    width: 14em;
    height: 100%;
    color: #666666;
    border: none;
    outline: none;
    border-radius: 4px;
    margin: 0;
    padding: 0.1em 1em;
    font-style: italic;
}
.activeStyle {
    box-shadow: 0 0 14px #113336;
    animation: sidebarIconShadow 4s infinite;
}
</style>
