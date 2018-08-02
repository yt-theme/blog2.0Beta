import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
let reqUrl = 'http://192.168.0.141:8000/'
// NotifyPop timer
var timer

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
        // dialogSidePop show
        sidebarPopShow: false,
        sidebarPopSelectId: '',
        sidebarPopData: {'id': '', 'content': ['loading']},
        sidebarPopPwdInputData: '',
        sidebarPopEditPasswordCheck: true,
        // sidebarPop new article input
        VModelSidebarPopArticleInputData: '',
        // sidebarPop new article textarea
        VModelSidebarPopArticleTextareaData: '',
        // sidebarPop new article type
        VModelSidebarPopArticleTypeData: 'web',
        resultForNewArticle: '',
        // notifyPop show
        notifyPopShow: false,
        // notifyPop data
        notifyPopData: 'err',
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
        },
        toggleSidebarPop (state, bool) {
            state.sidebarPopShow = bool
        },
        setSidebarPopSelectId (state, id) {
            state.sidebarPopSelectId = id
        },
        requestSidebarPopContent (state, id) {
            state.sidebarPopData = {'id': '', 'content': ['loading']}
            var params = new URLSearchParams()
            params.append('id',id)
            axios.post(reqUrl + 'getSidebarPopContent/', params).then((res)=> {
                state.sidebarPopData = res.data
                state.sidebarPopData = Object.assign({}, state.sidebarPopData)
            })
        },
        checkSidebarPopEditPassword (state, dat) {
            var params = new URLSearchParams()
            params.append('pwd', dat)
            axios.post(reqUrl + 'getSidebarPopEditPasswordCheck/', params).then((res)=> {
                if (res.data.data == 'true') {
                    state.sidebarPopEditPasswordCheck = false
                } else if (res.data.data == 'false') {
                    state.sidebarPopEditPasswordCheck = true
                }
            })
        },
        sidebarPopEditPasswordTrue (state) {
            state.sidebarPopEditPasswordCheck = true
        },
        setSidebarPopPwdInputData (state, dat) {
            state.sidebarPopPwdInputData = dat
        },
        clearSidebarPopPwdInputData (state) {
            state.sidebarPopPwdInputData = ''
        },
        // sidebarPop vmodel new article input
        VModelSidebarPopArticleInputData (state, dat) {
            state.VModelSidebarPopArticleInputData = dat
        },
        // sidebarPop vmodel new article textarea
        VModelSidebarPopArticleTextareaData (state, dat) {
            state.VModelSidebarPopArticleTextareaData = dat
        },
        // sidebarPop vmodel new article type
        VModelSidebarPopArticleTypeData (state, dat) {
            state.VModelSidebarPopArticleTypeData = dat
        },
        submitNewArticle (state, dat) {
            let qs = require('qs')
            axios.post(reqUrl + 'getSubmitNewArticle/', qs.stringify(dat)).then((res)=> {
                state.resultForNewArticle = res.data.res
            })
        },
        // close notifyPop
        closeNotifyPop (state) {
            state.notifyPopShow = false
        },
        // notifyPop true
        showNotifyPop (state) {
            if (timer) {
                clearTimeout(timer)
            }
            state.notifyPopShow = true
            timer = setTimeout(()=>{state.notifyPopShow = false}, 9000)
        },
        // notifyPop data
        setNotifyPopData (state, dat) {
            state.notifyPopData = dat
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
        },
        // sidebarPop show
        toggleSidebarPop (context, bool) {
            context.commit('toggleSidebarPop', bool)
        },
        setSidebarPopSelectId (context, id) {
            context.commit('setSidebarPopSelectId', id)
        },
        requestSidebarPopContent (context, id) {
            context.commit('requestSidebarPopContent', id)
        },
        checkSidebarPopEditPassword (context, dat) {
            context.commit('checkSidebarPopEditPassword', dat)
        },
        sidebarPopEditPasswordTrue (context) {
            context.commit('sidebarPopEditPasswordTrue')
        },
        closeNotifyPop (context) {
            context.commit('closeNotifyPop')
        },
        showNotifyPop (context) {
            context.commit('showNotifyPop')
        },
        setNotifyPopData (context, dat) {
            context.commit('setNotifyPopData', dat)
        },
        submitNewArticle (context, dat) {
            context.commit('submitNewArticle', dat)
        }
    }
})