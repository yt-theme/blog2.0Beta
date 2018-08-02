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
        sidebarPoptitle: '',
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
        windowEdit_id: '',
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
            // clear input
            // state.VModelSidebarPopArticleInputData = '',
            // state.VModelSidebarPopArticleTextareaData = '',
            // state.VModelSidebarPopArticleTypeData = 'web',

            state.sidebarPopShow = bool
        },
        setSidebarPopSelectId (state, id) {
            state.sidebarPopSelectId = id
        },
        requestSidebarPopContent (state, id) {
            // clear input
            // state.VModelSidebarPopArticleInputData = '',
            // state.VModelSidebarPopArticleTextareaData = '',
            // state.VModelSidebarPopArticleTypeData = 'web',

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
        setSidebarPoptitle (state, dat) {
            state.sidebarPoptitle = dat
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
        // edit
        addDataSidebarPopEditArticle (state, dat) {
            state.VModelSidebarPopArticleInputData = dat.h1
            state.VModelSidebarPopArticleTextareaData = dat.content
            state.VModelSidebarPopArticleTypeData = dat.type
        },
        // edit id
        set_windowEdit_id (state, id) {
            state.windowEdit_id = id
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
                state.resultForNewArticle = dat
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
        setSidebarPoptitle (context, dat) {
            context.commit('setSidebarPoptitle', dat)
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
        // edit
        addDataSidebarPopEditArticle (context, dat) {
            context.commit('addDataSidebarPopEditArticle', dat)
            context.commit('set_windowEdit_id', dat.id)
        },
        // edit id
        set_windowEdit_id (context, id) {
            context.commit('set_windowEdit_id', id)
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
            let qs = require('qs')
            if (dat.id != '' || dat.id) {
                axios.post(reqUrl + 'getSubmitEditArticle/', qs.stringify(dat)).then((res)=> {
                    context.commit('submitNewArticle', res.data.res)
                    context.commit('showNotifyPop')
                    context.commit('setNotifyPopData', 'success')
                    context.commit('requestDesktopIconList')
                    console.log(res.data)
                })
            } else if (dat.id == '') {
                axios.post(reqUrl + 'getSubmitNewArticle/', qs.stringify(dat)).then((res)=> {
                    context.commit('submitNewArticle', res.data.res)
                    context.commit('showNotifyPop')
                    context.commit('setNotifyPopData', 'success')
                    context.commit('requestDesktopIconList')
                })
            }
        }
    }
})