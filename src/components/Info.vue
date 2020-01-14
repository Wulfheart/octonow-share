<template>
    
        <div :class="[$store.getters.operational ? 'bg-wi-accent-green-500' : 'bg-wi-accent-yellow-700']" class="w-full h-full lg:h-auto min-h-3 p-4 text-white rounded" id='Info'>
            <h1 class="text-3xl pb-4 text-white font-bold">{{ status }}</h1>
            <Property label="Bisherige Druckzeit:" alternative="Zurzeit liegen keine Informationen vor"> {{ print_time }} </Property>
            <Property label="Ausstehende Druckzeit:" alternative="Zurzeit liegen keine Informationen vor">{{ print_time_left}}</Property>
            <Property label="Druckdatei:" alternative="Zurzeit liegen keine Informationen vor">{{ file }}</Property>
        </div>
        
</template>

<script>
import Property from './elements/Property.vue'
import Moment from 'moment'
// TODO: 3 State Background, Druckzeiten besser anzeigen
    export default {
        name: 'Info',
        components: {
            Property,
        },
        data: function () {
            return {
               
            }
        },
        computed: {
            status() {
                return this.$store.state.job.state
            },
            print_time(){
                return this.$store.state.job.progress.printTime
                return Moment.duration(this.$store.state.job.progress.printTime).humanize()
            },
            print_time_left(){
                return this.$store.state.job.progress.printTimeLeft
            },
            file() {
               return this.$store.state.job.job.file.display
            }
        }
    }
</script>
