import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
let reqUrl = 'http://192.168.0.141:8000/'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        // header menu
        menuData:[],
        // notify number
        notifyNum: '',
        // desktopp icon
        desktopIconList: [],
        // sidebar icon
        sidebarIconList: [],
        // window title
        windowItem: [],
    },
    mutations: {
        requestMenuData (state) {
            axios.get(reqUrl + 'getMenu/').then((res)=> {
                if (res.data.length>0) {
                    state.menuData = res.data
                }
            })
        },
        requestNotifyNumber (state) {
            axios.get(reqUrl + 'getNotifyNumber/').then((res)=> {
                if (res.data) {
                    state.notifyNum = res.data.data
                }
            })
        },
        requestDesktopIconList (state) {
            axios.post(reqUrl + 'getDesktopIconList/').then((res)=> {
                if (res.data.length>0) {
                    state.desktopIconList = res.data
                }
            })
        },
        requestSidebarIconList (state) {
            axios.post(reqUrl + 'getSidebarIconList/').then((res)=> {
                if (res.data.length>0) {
                    state.sidebarIconList = res.data
                }
            })
        },
        addWindow (state, obj) {
            state.windowItem.push({
                'component': obj.component,
                'label': obj.label
            })
            // window id
            let tim = new Date().getTime()
            state.windowItem[state.windowItem.length - 1].id = tim
        },
        deleteWindow (state, id) {
            for (let i=0;i<state.windowItem.length;i++) {
                if (state.windowItem[i]['id'] == id) {
                    state.windowItem.splice(i, 1)
                }
            }
        }
    }
})