<template>
    <div class="min-h-screen flex items-center justify-center">
        <!-- TODO: Small Breakpoint: wi Bild verrutscht nach links -->

        <div class="max-w-md">
            <div v-if="! noPorts">
                <div class="flex flex-col">
                <div>
                    <label for="Port">Port auswählen:</label>
                    <select v-model="selectedPort" name="Port" id="port">
                        <option v-for="port in connection.options.ports" :value="port">{{ port }}</option>
                    </select>
                </div>
                    <Button class="my-6" @click.native="connect" type="primary">Verbinden</Button>
                </div>

            </div>
            <p v-if="noPorts">Keine Ports gefunden. Bitte kontaktieren Sie jemanden, der sich mit OctoPrint auskennt</p>
        </div>
    </div>
</template>

<script>
    import Button from '../components/elements/Button.vue'
    export default {
        name: 'Connection',
        components: {
            Button
        },
        data: function () {
            return {
                connection: {
                    options: {
                        ports: []
                    }
                },
                selectedPort: ''

            }
        },
        computed: {
            noPorts: function () {
                if (this.connection.options.ports.length == 0) return true
                else return false
            }
        },
        mounted: function () {
            this.$http.get(this.$store.getters.baseURL + 'connection', this.$store.getters.config)
                .then(response => {
                    if (response.data.current.state == 'Closed') {
                        this.connection = response.data
                    } else this.$router.push('/')
                })
        },
        methods: {
            connect: async function () {
                // Funktioniert nicht mit einem virtuellen Drucker😂
                this.$http.post(this.$store.getters.baseURL + 'connection', {
                    "command": "connect",
                    // "port": "VIRTUAL"
                }, this.$store.getters.config)
                .then(this.$router.push('/'))
                .catch(error => {
                    alert(error)
                })
                


            }
        }
    }
</script>