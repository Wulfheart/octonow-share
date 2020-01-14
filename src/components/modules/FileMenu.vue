<template>
    <div class="py-6 px-3 bg-white  m-2 rounded min-h-3/4">
        <div class="flex flex-col w-full">
            <div class="flex flex-row justify-between items-baseline mx-4 my-2">
                <div class="flex flex-col">
                    <h1 class="text-3xl font-bold ">Optionen</h1>
                    <div class="">
                        <p>{{ type }}: <span class="font-mono">/{{ staged.path }}</span></p>
                    </div>
                </div>
                <div @click="$emit('closeMenu')" class="group cursor-pointer flex flex-grow justify-end ">
                    <i class="ion-ios-close text-4xl text-wi-stone-900 group-hover:text-wi-stone-700"></i>
                </div>
            </div>
            <div v-if="! placeholder">
                <Button @click.native="deleteStaged" type="plain" :disabled="disableDelete"
                    class="mx-4 my-2 flex items-center">
                    <i class="ion-ios-trash text-xl pr-2"></i>Löschen
                </Button>
                <Button v-if="! hideDownload" @click.native="download" :link="staged.refs.download" type="plain"
                    class="mx-4 my-2 flex items-center">
                    <i class="ion-ios-download text-xl pr-2"></i>Download
                </Button>
                <Button v-if="! hideLoad" @click.native="load" type="plain" class="mx-4 my-2 flex items-center">
                    <i class="ion-ios-clipboard text-xl pr-2"></i>Laden
                </Button>
                <Button v-if="! hidePrint" @click.native="print" type="plain" class="mx-4 my-2 flex items-center">
                    <i class="ion-ios-print text-xl pr-2"></i>Drucken
                </Button>
            </div>
            <div v-if="placeholder">
            <img src="../../assets/illustrations/os.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import Button from '../elements/Button.vue'
    export default {
        name: 'ContextMenu',
        components: {
            Button
        },
        props: {
            staged: Object
        },
        computed: {
            disableDelete: function () {
                return true
                if (typeof this.staged.children == 'undefined') {
                    return false
                } else if (this.staged.children.length > 0) return true
                else return false
            },
            hideDownload: function () {
                if (this.staged.type === 'folder') return true
            },
            hideLoad: function () {
                return true
                if (this.staged.type === 'folder') return true
            },
            hidePrint: function () {
                if (this.staged.type === 'folder') return true
            },
            type: function () {
                if (this.staged.type === 'folder') return 'Folder'
                else return 'File'
            },
            placeholder: function () {
                if (this.staged.type === 'folder') return true
            }
        },
        methods: {
            deleteStaged: function () {
                // Diese if-Abfrage ist nur in dieser Methode notwendig, weil in allen anderen Methoden der Button versteckt ist
                if (!this.disableDelete) {
                    this.$emit('menu', 'delete')
                    this.close()
                }
            },
            download: function () {
                this.$emit('menu', 'download')
                this.close()
            },
            load: function () {
                this.$emit('menu', 'load')
                this.close()
            },
            print: function () {
                this.$emit('menu', 'print')
                this.close()
            },
            close: function () {
                this.$emit('closeMenu', 'close')
            }
        }
    }
</script>