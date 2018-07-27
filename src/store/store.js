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
        // window data
        windowData: {
            
        },
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
            let tag = true
            for (let i=0;i<state.windowItem.length;i++) {
                if (state.windowItem[i]['id'] == obj.id) {
                    tag = false
                }
            }
            if (tag) {
                let id = new Date().getTime()
                state.windowItem.push({
                    'component': obj.component,
                    'label': obj.label,
                    'id': obj.id
                })
            }
        },
        // window data
        requestWindowContent: (state, id) => {
            var params = new URLSearchParams()
            params.append('id',id)
            axios.post(reqUrl + 'getWindowContent/', params).then((res)=> {
                let resId = res.data['id']
                state.windowData[id] = res.data
                state.windowData = Object.assign({}, state.windowData)
            })
        },
        deleteWindow (state, id) {
            for (let i=0;i<state.windowItem.length;i++) {
                if (state.windowItem[i]['id'] == id) {
                    state.windowItem.splice(i, 1, '')
                }
            }
            let tag = true
            for (let i=0;i<state.windowItem.length;i++) {
                if (state.windowItem[i] != '') {
                    tag = false
                }
            }
            if (tag) {
                this.state.windowData = {
                    
                }
            }
        }
    },
    actions: {
        addWindow (context,obj) {
            context.commit('addWindow',obj)
        },
        requestWindowContent (context,id) {
            context.commit('requestWindowContent',id)
        },
        deleteWindow (context,id) {
            context.commit('deleteWindow',id)
        }
    }
})