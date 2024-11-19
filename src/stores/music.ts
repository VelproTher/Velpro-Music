import { defineStore } from 'pinia'
import { ref, reactive, watch, toRefs } from 'vue'

export const useMusicStore = defineStore('music', () => {

  // 创建音频源
  const audioSrc = ref('')

  // 音乐属性
  const Music = reactive({
    audio: new Audio(),
    isPlay: false,
    curTime: 0,
    duration: 0
  })

  // 播放
  const play = () => {
    if (!Music.isPlay && audioSrc.value) {
      Music.audio.play();
      Music.isPlay = true
    } else {
      Music.audio.pause();
      Music.isPlay = false
    }
  }

  // 实时计算当前播放时间
  Music.audio.addEventListener('timeupdate', () => {
    Music.curTime = Math.floor(Music.audio.currentTime)
  })

  // 改变当前播放时间
  const changeCurTime = (val: number) => {
    Music.audio.currentTime = val
  }

  // 切换音频
  const changeAudio = (src: string) => {
    audioSrc.value = src
  }

  // 初始化音乐总时长
  watch(audioSrc, (val) => {
    Music.audio.src = val;
    Music.audio.load();
    Music.audio.addEventListener('loadedmetadata', () => {
      Music.duration = Math.floor(Music.audio.duration);
      Music.audio.play();
      Music.isPlay = true
    })
  }, {
    immediate: true
  })

  const { isPlay, curTime, duration } = toRefs(Music)
  return {
    isPlay,
    curTime,
    duration,
    changeCurTime,
    play,
    changeAudio
  }
})
