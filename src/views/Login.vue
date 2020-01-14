<template>
    <div class="min-h-screen flex items-center justify-center">
        <!-- TODO: Small Breakpoint: wi Bild verrutscht nach links -->

        <div class="w-full max-w-md">
            <!-- v-on:submit="login()" Funktioniert nicht -- Investiagtion needed-->
            <form class="sm:border rounded sm:border-wi-stone-300 px-2 sm:px-16 pt-12 pb-16 mb-4">
                <div class="flex justify-content">
                    <img src="../assets/logo_wi.png" alt="">
                </div>
                <div class="mb-4">
                    <label class="block text-wi-stone-700 text-sm mb-2" for="username">
                        Username
                    </label>
                    <input class="input" id="username" type="text" placeholder="Username" v-model="username">
                </div>
                <div class="mb-6">
                    <label class="block text-wi-stone-700 text-sm mb-2" for="password">
                        Password
                    </label>
                    <input class="input" id="password" type="password" placeholder="******************"
                        v-model="password">
                </div>
                <div class="mb-6">
                    <label class="block text-wi-stone-700 text-sm mb-2" for="password">
                        Printer URL
                    </label>
                    <input class="input" id="printerurl" type="text" placeholder="10.100.0.6" v-model="printerURL">
                </div>
                <div class="flex items-center justify-end">
                    <Button type="primary" @click.native="login()">
                        Login
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import Button from '../components/elements/Button.vue'
    export default {
        name: 'Login',
        components: {
            Button
        },
        data: function () {
            return {
                username: null,
                password: null,
                printerURL: null

            }
        },
        methods: {
            login: async function () {
                this.$http.post('http://' +this.printerURL + '/api/login', {
                        user: this.username,
                        pass: this.password
                    }).then(response => {
                        // console.log(response.data)
                        this.$store.dispatch('login', {
                            'username': this.username,
                            'password': this.password,
                            'printerURL': this.printerURL,
                            'data': response.data
                        })

                        this.$http.get(this.$store.getters.baseURL + 'connection', this.$store.getters.config)
                        .then(response => {
                            // console.log(response.data.current.state)
                            if(response.data.current.state == 'Closed') {
                            this.$router.push('/connection')
                            } else this.$router.push('/')
                        })
                        // Funktioniert nicht mit einem virtuellen Drucker 😂
                        // this.$http.post(this.$store.getters.baseURL + 'connection', {
                        //         "command": "connect",
                        //         // "port": "VIRTUAL"
                        // }, this.$store.getters.config).catch(error =>{
                        //     // console.log(error)
                        // })
                        
                    })
                    .catch(function(error) {
                        if(error.response.status === 401) alert('Nutzername/Passwort inkorrekt!')
                        else alert('Etwas ist schiefgelaufen. Bitte überprüfen Sie die Adresse ihres OctoPis.')
                    })

            }
        },
        watch: {
    color: {
      deep: true,
      handler(newColor) {
        // console.log("Oh, look, a new color!", newColor);
      }
    }
  },
    }
</script>
