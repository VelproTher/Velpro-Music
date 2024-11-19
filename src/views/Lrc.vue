<script setup lang="ts">
import { useLrcStore } from '@/stores/lrc';
import { computed, toRefs, ref, onMounted } from 'vue';
import { useMusicStore } from '@/stores/music';

const lrc = useLrcStore();
const music = useMusicStore();
const { isShow, title, conversionLrc } = toRefs(lrc);
const { curTime } = toRefs(music);

// 页面显示和隐藏
const translateY = computed(() => {
    return `${isShow.value ? 0 : 100}%`
})

// 实时获取当前播放的歌词数组下标
const curLrcIndex = computed(() => {
    for (let i = 0; i < conversionLrc.value.length; i++) {
        if (curTime.value < conversionLrc.value[i].time) {
            return i - 1;
        }
    }
    return conversionLrc.value.length - 1;
})

// 容器和歌词元素
const boxHeight = ref()
const lrcHeight = ref()

// 歌词偏移量
let offset = ref(0)

// 实时改变歌词偏移量
onMounted(() => {
    offset = computed(() => {
        const maxOffset = lrcHeight.value.clientHeight - boxHeight.value.clientHeight + 80;
        let offsetHeight = lrcHeight.value.children[0].clientHeight * curLrcIndex.value + lrcHeight.value.children[0].clientHeight / 2 - boxHeight.value.clientHeight / 2;
        if (offsetHeight < 0) {
            offsetHeight = 0;
        }
        if (offsetHeight > maxOffset) {
            offsetHeight = maxOffset;
        }
        return offsetHeight
    })
})

</script>

<template>
    <div class="lrcBox" :style="{ transform: `translateY(${translateY})` }">
        <div class="name">{{ title }}</div>
        <div class="lrc" ref="boxHeight">
            <ul :style="{ transform: `translateY(-${offset}px)` }" ref="lrcHeight">
                <li v-for="(item, index) in conversionLrc" :key="item.time" :class="{ active: index === curLrcIndex }">
                    {{ item.word }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.lrcBox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #191919;
    text-align: center;
    overflow: hidden;
    transition: all .2s;

    .name {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 30px;
        font-weight: 600;
        color: #EDEDED;
        background: #191919;
        z-index: 1;
    }

    .lrc {
        width: 100%;
        height: 80%;
        margin-top: 80px;

        ul {
            font-size: 16px;
            color: #7E7E7E;
            transition: all .3s;

            li {
                padding: 15px 0;
                transition: all 0.3s;
            }

            .active {
                color: #EDEDED;
                transform: scale(1.6);
            }
        }
    }
}
</style>