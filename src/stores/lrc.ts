import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useLrcStore = defineStore('lrc', () => {

    // 歌词显隐
    const isShow = ref(false);

    // 切换显示
    const changeShow = () => {
        isShow.value = !isShow.value;
    }

    const title = ref('');

    // 原始歌词
    const oLrc = ref(``);

    // 处理歌词
    const conversionLrc = computed(() => {

        const arr: { time: number, word: string }[] = [];
        if (!oLrc.value) {
            arr.push({ time: 0, word: '*暂无歌词*' })
            return arr;
        }
        const lrcs = oLrc.value.split('\n');
        lrcs.pop();
        for (const i in lrcs) {
            const lrc = lrcs[i].split(']');
            const timeStr = lrc[0].substring(1);
            const times = timeStr.split(':');
            const time = parseInt(times[0]) * 60 + +times[1];
            const word = lrc[1];
            arr.push({ time, word })
        }
        return arr;
    })

    // 切换歌名
    const changeTitle = (name: string) => {
        title.value = name
    }

    // 切换歌词
    const changeLrc = (lrc: string) => {
        oLrc.value = lrc
    }
    return {
        isShow,
        title,
        conversionLrc,
        changeShow,
        changeTitle,
        changeLrc
    }
})