<script setup lang="ts">
import { useMusicStore } from "@/stores/music";
import { useLrcStore } from '@/stores/lrc';
import { ref, computed, toRefs, watch } from "vue";
const Music = useMusicStore();
const { changeShow } = useLrcStore();
const { isPlay, curTime, duration } = toRefs(Music);
const { play, changeCurTime } = Music

// 进度条百分比
const progress = ref(0)

// 格式化当前时间
const showCurTime = computed((): string => {
    let oSec: number = Math.floor(curTime.value % 60);
    let min: number = Math.floor(curTime.value / 60);
    let sec: string = '00'
    oSec < 10 ? sec = '0' + oSec : sec = oSec.toString()
    return min + ":" + sec;
})

// 格式化总时长
const showDuration = computed((): string => {
    let oSec: number = Math.floor(duration.value % 60);
    let min: number = Math.floor(duration.value / 60);
    let sec: string = '00'
    oSec < 10 ? sec = '0' + oSec : sec = oSec.toString()
    return min + ":" + sec;
})

// 监听当前时间改变从而改变进度条
watch(curTime, (val) => {
    progress.value = val / duration.value * 100;
}, {
    deep: true
})

// 用户改变进度条从而改变音频当前时间
const changeProgress = () => {
    changeCurTime(progress.value * duration.value / 100)
}

</script>

<template>
    <div class="control">
        <div class="switch">
            <div class="play iconfont" v-html="isPlay ? '&#xe693;' : '&#xe66e;'" @click="play"></div>
        </div>
        <div class="curTime">{{ showCurTime }}</div>
        <div class="bar">
            <el-slider v-model="progress" :show-tooltip="false" @change="changeProgress" />
        </div>
        <div class="duration">{{ showDuration }}</div>
        <div class="lrc iconfont" @click="changeShow">&#xe75a;</div>
    </div>
</template>

<style scoped lang="scss">
.control {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    min-width: 300px;
    height: 10%;
    max-height: 100px;
    background: #2D2D38;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #BBBBBB;
    text-align: center;
    user-select: none;
    z-index: 999;

    // 播放控件
    .switch {
        display: flex;
        justify-content: center;
        align-items: center;

        .play {
            font-size: 30px;
            line-height: 50px;
            cursor: pointer;

            &:hover {
                color: #fff;
            }
        }
    }

    // 时间
    .curTime,
    .duration {
        width: 60px;
        color: #7D7D84;
    }

    // 进度条控件
    .bar {
        width: 35%;

        :deep(.el-slider__runway) {
            background: #42424C;
        }

        :deep(.el-slider__bar) {
            background: #C74156;
        }

        :deep(.el-slider__button) {
            border: none;
            transform: scale(.6);
        }
    }

    // 歌词
    .lrc {
        font-size: 30px;
        cursor: pointer;

        &:hover {
            color: #fff;
        }
    }
}
</style>