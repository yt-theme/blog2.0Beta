<template>
    <div class="header_container">
        <div class="header_left">
            <Logo></Logo>
            <MenuList></MenuList>
        </div>
        <NotifyArea></NotifyArea>
    </div>
</template>

<script>
import Logo from './logo'
import MenuList from './menuList'
import NotifyArea from './notifyArea'
export default {
    components: {
        Logo,
        MenuList,
        NotifyArea
    }
}
</script>

<style scoped>
.header_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #CCD1D2;
    height: 33px;
    padding: 0 6px;
    color: #666;
}
.header_left {
    display: flex;
}
</style>
