<template>
    <div class="header_container">
        <div class="header_left">
            <Logo></Logo>
            <MenuList></MenuList>
        </div>
        <div class="header_right">
            <WebsocketSysMonitor></WebsocketSysMonitor>
            <ActionButtonArea></ActionButtonArea>
            <NotifyArea></NotifyArea>
        </div>
    </div>
</template>

<script>
import Logo from './logo'
import MenuList from './menuList'
import NotifyArea from './notifyArea'
import ActionButtonArea from './actionButtonArea'
import WebsocketSysMonitor from '../websocket/websocket_sysMonitor'
export default {
    components: {
        Logo,
        MenuList,
        NotifyArea,
        ActionButtonArea,
        WebsocketSysMonitor
    }
}
</script>

<style scoped>
.header_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(204, 209, 210, 0.999);
    height: 33px;
    padding: 0 6px;
    color: #666;
}
.header_left, .header_right {
    display: flex;
}
</style>
