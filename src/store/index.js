import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const state = {
    user: {
        username: null,
        password: null,
        printerURL: null,
        misc: {
            user: null
        }
        /*
        username
        password
        printerURL
        misc (Datamodel Login)
        */
    },
    job: {},
    printer: {}, 
    connection: {}
}

const getters = {
    loggedIn: state => {
        return state.user.misc.user;
    },
    baseURL: state => {
        return 'http://' + state.user.printerURL + '/api/'
    },
    operational: state => {
        return state.job.state == 'Operational'
    },
    disconnected: state => {
        return state.job.state == 'Disconnected'
    },
    config: state => {
        return {
            headers: {
                'X-Api-Key': state.user.misc.apikey,
                'Content-Type': 'application/json',
            }
        }
    }


}

const mutations = {
    login(state, payload) {
        state.user.username = payload.username;
        state.user.password = payload.password;
        state.user.printerURL = payload.printerURL;
        state.user.misc = Object.assign(payload.data)
    },
    printer(state, payload) {
        state.printer = Object.assign(payload)
    },
    job(state, payload) {
        state.job = Object.assign(payload)
    },
    connection(state, payload) {

    }
}

const actions = {
    login(context, {
        username,
        password,
        printerURL,
        data
    }) {
        context.commit('login', {
            'username': username,
            'password': password,
            'printerURL': printerURL,
            'data': data
        })
    },
    GET_PRINTER({
        commit,
        state,
        getters
    }) {
        if (getters.loggedIn) {
            axios.get(getters.baseURL + 'printer?history=true&limit=450',getters.config)
                .then(response => {
                    commit('printer', response.data)
                })
                .catch(error => {
                    // console.log(error)
                })
        }
    },
    GET_JOB({
        commit,
        state,
        getters
    }) {
        if (getters.loggedIn) {
            axios.get(getters.baseURL + 'job',getters.config)
                .then(response => {
                    // // console.log(response.data)
                    commit('job', response.data)
                })
                .catch(error => {
                    // // console.log(error)
                })
        }
    },
    GET_CONNECTION({
        commit,
        state,
        getters
    }) {
        // if (getters.loggedIn) {
        //     axios.get(getters.baseURL + 'job',getters.config)
        //         .then(response => {
        //             // console.log(response.data)
        //             commit('job', response.data)
        //         })
        //         .catch(error => {
        //             // console.log(error)
        //         })
        // }
    }
}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
