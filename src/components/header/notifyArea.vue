<template>
    <div class="notifyArea_container">
        <div class="weather">
            {{this.$store.state.weather ? this.$store.state.weather : ' -- '}}
        </div>
        <div class="notifyArea_num">
            AllArticle: <span>{{this.$store.state.notifyNum ? this.$store.state.notifyNum : '0'}}</span>
        </div>
        <div class="notifyArea_timer" :title='day'>
            {{time}}
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            time: '0 : 00 : 00',
            day: '0000 - 0 - 0'
        }
    },
    methods: {
        setTime() {
            let date = new Date()
            let h = date.getHours()
            let m = date.getMinutes()
            if (m<10) {
                m = '0' + m
            }
            let s = date.getSeconds()
            if (s<10) {
                s = '0' + s
            }
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let days = date.getDate()
            let week = date.getDay()
            this.time = h + ' : ' + m + ' : ' + s
            this.day = year + ' - ' + month + ' - ' + days + ' week ' + week
        },
        weather() {
            this.$store.dispatch('getWeather')
        }
    },
    mounted () {
        setInterval(
            this.setTime
        ,1000)
        this.$store.commit('requestNotifyNumber')
        this.weather()
        setInterval(
            this.weather
        ,540000)
    }
}
</script>

<style scoped>
.notifyArea_container {
    display: flex;
}
.weather, .notifyArea_num, .notifyArea_timer {
    background-color: #f9f8f7;
    border-radius: 4px;
    box-shadow: 0 0 0.5px #999;
    text-shadow: 0 0 0.5px #f9f8f7;
    margin-left: 6px;
    padding: 2px 6px;
    cursor: default;
}
.notifyArea_num {
    cursor: pointer;
}
</style>
