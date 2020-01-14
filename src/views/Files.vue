<template>
    <div>
        <div v-if="showMenu"
            class="flex fixed min-w-full min-h-full  items-end md:items-center justify-center z-40 bg-semitransparent">
            <FileMenu class="w-full border border-wi-stone-700 shadow-xl md:w-1/2 mb-10" :staged="staged"
                @closeMenu="showMenu = false" @menu="menuHandler(...arguments)" />
        </div>
        <Nav />
        <div class="z-0">
            <div class="hidden md:flex justify-center mx-auto">
                <div class="w-full md:w-1/3">
                    <Button class="text-4xl font-bold">Dateien</Button>
                </div>
            </div>
            <div class="flex justify-center">
                <div class="w-full md:w-1/4">
                    <div class="flex items-center bg-primary-main rounded-t text-white">
                        <div class="">
                            <Button v-if="! isRoot" type="simple" @click.native="branch(parentFolder)">
                                <i class="ion-ios-arrow-back text-3xl"></i>
                            </Button>
                            <Button v-if="isRoot" type="simple">
                                <i class="ion-ios-cube text-3xl"></i>
                            </Button>
                        </div>
                        <h1 class="font-mono">{{ currentFolder.path }}</h1>
                    </div>
                    <div v-for="file in currentFiles">
                        <FileCard :filedata="file" @cardClick="clickHandler(file, ...arguments)" />
                    </div>
                    <div class="my-16 mx-4 min-h-full flex flex-col justify-center" v-if="empty">
                        <img src="../assets/illustrations/empty.svg" class="object-contain" alt="">
                        <h1 class="text-center text-lg font-bold m-4">Uuups... Dieser Ordner ist leer!</h1>
                        <div class="flex flex-grow-0 justify-center">
                            <Button type="primary" disabled><i class="ion-ios-share text-xl font-bold mr-2"></i>Datei
                                Hochladen</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    // In diesem Fall werden die Daten direkt im Komponenten gespeichert, weil man hier nicht von verschiedenen Orten zugreifen muss
    // Manch einer würde das sicher inkonsistent nennen, ich habe aber gerade keine Lust, mich erneut intensiv mit dem Store auseinanderzusetzen
    // Refactor only when you have to 💖
    import axios from 'axios'
    import isBlank from 'is-blank'
    import FileCard from '../components/modules/FileCard.vue'
    import FileMenu from '../components/modules/FileMenu.vue'
    import Button from '../components/elements/Button.vue'
    import Nav from '../components/Nav.vue'

    export default {
        name: 'Files',
        components: {
            FileCard,
            FileMenu,
            Button,
            Nav
        },
        data: function () {
            return {
                currentFiles: {},
                isRoot: true,
                showMenu: false,
                currentFolder: {
                    path: 'root'
                },
                fileapi: 'http://10.55.100.109/api/files',
                staged: {}
            }
        },
        computed: {
            parentFolder: function () {
                // Annahme: Wenn currentFolder.path keine / enthält, dann ist als Oberverzeichnis das rootverzeichnis gefordert
                var tree = this.currentFolder.path.split('/')
                var level = tree.length - 1
                if (level == 0) return ''
                else {
                    var path = this.fileapi
                    path = path + '/' + this.currentFolder.origin
                    for (let i = 0; i < level; i++) {
                        path = path + '/' + tree[i]
                    }
                    return path
                }
            },
            empty: function () {
                return (this.currentFiles.length == 0)
            },
            currentPath: function () {
                // console.log(this.currentFolder.path)
                if (this.currentFolder.path === 'root') {
                    return ''
                } else {
                    return this.currentFolder.refs.resource
                }
            }
        },
        mounted: function () {
            this.branch()
        },
        methods: {
            // Branch holt einen Unterordner
            branch: function (path) {
                //! Hardcoded
                var pathConstructedForURL = ''
                var rootFlag = false
                var apikey = '856E20639BA343779BE6DB4503452130'
                // console.log('Is Blank: ' + isBlank(path))
                if (isBlank(path)) {
                    pathConstructedForURL = this.$store.getters.baseURL + 'files'
                    rootFlag = true
                } else pathConstructedForURL = path
                // console.log(pathConstructedForURL)
                axios.get(pathConstructedForURL, this.$store.getters.config)
                    .then(response => {
                        // console.log(rootFlag)
                        // console.log(response.data)
                        this.isRoot = rootFlag
                        var currentFilesTemp

                        if (rootFlag) {
                            currentFilesTemp = response.data.files
                            this.currentFolder.path = 'root'
                        } else {
                            currentFilesTemp = response.data.children
                            this.currentFolder = response.data
                        }
                        // Sort Files
                        var folders, files
                        folders = currentFilesTemp.filter(obj => obj.type === 'folder')
                        files = currentFilesTemp.filter(obj => obj.type != 'folder')
                        this.currentFiles = folders.concat(files)
                    })
            },
            clickHandler: function (file, payload) {
                if (file.type === 'folder') {
                    if (payload === 'select') {
                        this.branch(file.refs.resource)
                    }
                    if (payload === 'options') {
                        // console.log(file)
                        this.staged = file
                        this.showMenu = true
                    }
                } else {
                    this.staged = file
                    this.showMenu = true
                }
            },
            menuHandler: function (payload) {
                // TODO: Axios Errorhandling
                if (payload === 'delete') {
                    // console.log('Res:' + this.staged.refs.resource + KEY)
                    var url = this.staged.refs.resource + KEY
                    // console.log(url)
                    axios.delete(url)
                        .then(this.branch(this.currentPath))
                }
                if (payload === 'download') {

                }
                if (payload === 'load') {
                    alert('load')
                }
                if (payload === 'print') {
                        axios.post(this.staged.refs.resource,{
                            "command": "select",
                            "print": true
                        },this.$store.getters.config)
                        .then(function (response){
                            this.$router.push('/')
                        })
                        .catch(function (error) {
                            alert(error.response.data);
                        })
                }

            }
        }
    }
</script>