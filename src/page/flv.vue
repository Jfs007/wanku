<template>
  <div>
    <video id="videoElement"></video>
  </div>
</template>
<script>
import flvjs from '../../node_modules/flv.js/dist/flv.min.js';
export default {
  mounted() {
    if (flvjs.isSupported()) {
        var videoElement = document.getElementById('videoElement');
        var flvPlayer = flvjs.createPlayer({
            type: 'mp4',
            url: '/static/cat.mp4'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    }
  }
}
</script>
<style scoped>

</style>


