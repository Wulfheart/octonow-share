<template>
    <nav id="app" class="sticky top-0 bg-white">
        <div class="h-1"
            v-bind:class="[$store.getters.operational ? 'bg-wi-accent-green-500' : 'bg-wi-accent-red-700']">
        </div>
        <!-- Das ließe sich sicher eleganter lösen, mir fehlt aber der Nerv dazu, deshalb auf eine Art und Weise auf die es sicher klappt -->
        <div class="container mx-auto px-4">
            <div class="flex justify-between py-4 items-center">
                <div class="flex flex-row items-center">
                    <img src="../assets/logo_wi.png" alt="" class="object-contain h-24  mr-2">
                </div>
                <div class="hidden lg:flex flex-row justify-between">
                    <router-link to="/" class="is-nav">Dashboard</router-link>
                    <router-link to="/files" class="is-nav">Dateien</router-link>

                </div>
                <div class="flex flex-row">
                    <Button link="https://new.wi.com/de/de/unternehmen/jobs.html" new-tab type="primary"
                        class="hidden lg:flex mr-3">Mitmachen</Button>
                    <Button type="danger" class="hidden lg:flex" @click.native="emergency">Not-Druckstop</Button>
                    <Button type="primary" class="lg:hidden" @click.native="toggle"><i
                            class="ion-ios-menu text-2xl"></i></Button>
                </div>

            </div>
            <div :class="open? 'flex flex-col justify-center' : 'hidden'" class="lg:hidden ">
                <router-link to="/" class="is-nav">Dashboard</router-link>
                <router-link to="/files" class="is-nav">Dateien</router-link>
                <!-- TODO: Evtl. ein wenig zu klein -->
                <Button link="https://new.wi.com/de/de/unternehmen/jobs.html" new-tab type="primary"
                    class="lg:hidden my-3 px-4">Mitmachen</Button>
                <Button type="danger" @click.native="emergency">Not-Druckstop</Button>
            </div>

        </div>
    </nav>

</template>

<script>
    import Button from './elements/Button.vue'
    export default {
        name: 'Nav',
        components: {
            Button
        },
        data: function () {
            return {
                open: false,
            }
        },
        methods: {
            toggle() {
                this.open = !this.open
            },
            emergency: function () {
                this.$http.post(this.$store.getters.baseURL + 'login', {
                    user: this.username,
                    pass: this.password
                }, this$store.getters.config).catch(error => alert(error))
            }
        },
        computed: {
            operational() {

            }
        }

    }
</script>