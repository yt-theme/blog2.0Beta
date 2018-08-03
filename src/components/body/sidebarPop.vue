<template>
    <div v-if="this.$store.state.sidebarPopShow" class="sidebarPop_container">
        <i class="close" @click="closePop"></i>
        <div class="body">
            <template v-if="titleTop">
                <h1>{{ this.$store.state.sidebarPoptitle ? this.$store.state.sidebarPoptitle : titleTop }}</h1>
            </template>
            <div class="content_container">
                <ul v-if="this.$store.state.sidebarPopData['id'] !== 'num1'">
                    <li v-for="i in this.$store.state.sidebarPopData['content']">
                        {{i}}
                    </li>
                </ul>
                <!-- new article -->
                <div class="article" v-if="this.$store.state.sidebarPopData['id'] == 'num1'">
                    <div class="password_cover" v-if="this.$store.state.sidebarPopEditPasswordCheck">
                        <div class="password_cover_container">
                            <div style="display:flex;justify-content: space-between;align-items: center">
                                <span>Input Password</span>
                                <button @click="checkSidebarPopEditPassword">Confirm</button>
                            </div>
                            <input v-model="setSidebarPopPwdInputData" type="password"/>
                        </div>
                    </div>
                    <div class="article_header">
                        <input class="article_title" placeholder="Title" maxlength="14" v-model="VModelSidebarPopArticleInputData"/>
                        <div style="display:flex;align-items:center">
                            Type
                            <select v-model="VModelSidebarPopArticleTypeData">
                                <option value="web" selected>web</option>
                                <option value="txt">txt</option>
                            </select>
                            <button class="article_submit" @click="submit">Submit</button>
                        </div>
                    </div>
                    <textarea class="article_main" placeholder="Your think" v-model="VModelSidebarPopArticleTextareaData"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title'],
    methods: {
        closePop () {
            // sidebarPop show
            this.$store.dispatch('toggleSidebarPop', false)
            // clear edit id
            this.$store.dispatch('set_windowEdit_id', '')
        },
        checkSidebarPopEditPassword () {
            let pwd = this.$store.state.sidebarPopPwdInputData
            this.$store.dispatch('checkSidebarPopEditPassword', pwd)
            this.$store.commit('clearSidebarPopPwdInputData')
        },
        submit () {
            if (this.$store.state.VModelSidebarPopArticleInputData) {
                let timer = new Date()
                let dat = {
                    'id': this.$store.state.windowEdit_id,
                    'contentType': this.$store.state.VModelSidebarPopArticleTypeData,
                    'h1': this.$store.state.VModelSidebarPopArticleInputData,
                    'content': this.$store.state.VModelSidebarPopArticleTextareaData,
                    'date': timer.getFullYear() + '-' + (Number(timer.getMonth()) + 1) + '-' + timer.getDate() + ' week' + timer.getDay() + ' ' + timer.getHours() + ':' + timer.getMinutes() + ':' + timer.getSeconds()
                }
                this.$store.dispatch('submitNewArticle', dat)
                return false
            } else {
                this.$store.dispatch('showNotifyPop')
                this.$store.dispatch('setNotifyPopData', 'Least Input Title')
            }
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
        },
        setSidebarPopPwdInputData: {
            get () {
                return this.$store.state.sidebarPopPwdInputData
            },
            set (dat) {
                this.$store.commit('setSidebarPopPwdInputData', dat)
            }
        },
        VModelSidebarPopArticleInputData: {
            get () {
                return this.$store.state.VModelSidebarPopArticleInputData
            },
            set (dat) {
                this.$store.commit('VModelSidebarPopArticleInputData', dat)
            }
        },
        VModelSidebarPopArticleTextareaData: {
            get () {
                return this.$store.state.VModelSidebarPopArticleTextareaData
            },
            set (dat) {
                this.$store.commit('VModelSidebarPopArticleTextareaData', dat)
            }
        },
        VModelSidebarPopArticleTypeData: {
            get () {
                return this.$store.state.VModelSidebarPopArticleTypeData
            },
            set (dat) {
                this.$store.commit('VModelSidebarPopArticleTypeData', dat)
            }
        }
    },
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
    width: 100%;
    height: 100%;
    padding: 20px;
    text-shadow: 0 0 14px #B0B6B6;
}
.body> h1 {
    margin: 0 20px;
}
.content_container {
    width: calc(100% - 40px);
    position: absolute;
    padding: 20px;
    height: calc(100% - 73px);
    overflow: auto;
}
.content_container ul {
    list-style: none
}
.content_container ul> li {
    line-height: 1.5;
    border-bottom: 1px solid #B0B6B6;
    word-wrap: break-word;
    word-break: break-all;
    margin-bottom: 11px;
}
.article {
    position: relative;
    width: 100%;
    height: 100%;
}
.password_cover {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(17,50,54,0.3);
}
.password_cover_container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 16em;
    background-color: #113236;
    border-radius:4px;
    padding: 23px 11px;
}
.password_cover_container button {
    height: 2em;
    border-radius: 4px;
    outline: none;
    border: none;
    background-color: #489799;
    cursor: pointer;
    color: #113337;
    padding: 0 11px;
}
.password_cover_container> input {
    width: 100%;
    height: 2em;
    border: none;
    outline: none;
    border-radius: 4px;
    background-color: #B0B6B6;
    margin-top: 13px;
    text-align: center;
    padding: 0 11px;
}
.article_header {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.article_header select {
    /* border: none; */
    appearance: none;
    outline: none;
    width: 8em;
    height: 2em;
    border-radius: 4px;
    background-color: #489799;
    border: 1px solid #489799;
    margin:0 11px;
    padding: 0 11px;
}
.article_header select> option {
    line-height: 2em;
}
.article_title {
    width: 15em;
    height: 2em;
    border: none;
    outline: none;
    text-shadow: 0 0 30px #489799;
    background-color: #B0B6B6;
    color: #113337;
    border-radius: 4px;
    padding: 0 11px;
}
.article_submit {
    height: 2em;
    outline: none;
    background-color: #489799;
    color: #113337;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;
    padding: 0 15px;
}
.article_main {
    width: 100%;
    height: calc(100% - 50px);
    border-radius: 4px;
    outline: none;
    color: #113337;
    background-color: #B0B6B6;
    text-shadow: 0 0 14px #489799;
    border: none;
    resize: none;
    margin-top: 11px;
    padding: 11px;
    overflow: auto;
}
</style>
