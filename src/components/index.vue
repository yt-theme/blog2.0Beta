<template>
    <div class="window_container">
        <Header></Header>
        <Body></Body>
    </div>
</template>

<script>
import Header from './header/header'
import Body from './body/body'
export default {
    components: {
        Header,
        Body
    },
    data () {
        return {
            
        }
    }
}
</script>

<style>
.window_container {
    width: 100vw;
    height: 100vh;
    background: url('../assets/bgi.png') no-repeat;
    background-size: cover;
}
</style>
