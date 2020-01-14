<template>
    <div>
        <!-- Overlay -->

        <div class="flex px-4 py-2 group cursor-pointer hover:bg-wi-stone-300 justify-between items-baseline"
            @mouseover="setHover" @mouseleave="resetHover">
            <div class="flex items-baseline flex-grow" @click="select">
                <i class="text-2xl" :class="icon"></i>
                <p class="ml-4">{{ filedata.display }}</p>
            </div>
            <div v-if="isFolder" @click="options" class="flex justify-end w-1/5">
                <Button type="simple">
                    <i class="icon ion-ios-more"></i>
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FileCard',
        props: {
            filedata: Object
        },
        data: function () {
            return {
                hover: false
            }
        },
        computed: {
            isFolder: function () {
                return this.filedata.type === "folder"
            },
            icon: function () {
                if (this.filedata.type === "folder") {
                    if (this.hover == true) return "icon ion-ios-folder-open"
                    else return "icon ion-ios-folder"
                } else return "icon ion-ios-document"
            }
        },
        methods: {
            setHover: function () {
                this.hover = true
            },
            resetHover: function () {
                this.hover = false
            },
            select: function() {
                this.$emit("cardClick","select")
            },
            options: function() {
                this.$emit("cardClick","options")
            }
        }
    }
</script>