<style>
.range-comment {
    position: absolute;
}
</style>
<template>
    <div :data-id="item.id" class="range-comment">
        <div >{{item.text}}</div>
    </div>
</template>
<script>
import { getComputedStyle } from "./range-core/lib/dom";
export default {
    props: {
        item: {
            default() {
                return {}
            }
        },
        index: {}
    },
    mounted() {
        this.getHeight();
    },
    methods: {
        getHeight() {
            let h = getComputedStyle(this.$el).height;
            console.log(h, 'h')
        }
    }
}
</script>