<script setup lang="ts">
import { reactive } from 'vue'
import request from '@/utils/request'
import { useLrcStore } from '@/stores/lrc';
import { useMusicStore } from '@/stores/music';
import type { searchData, musicData, data } from '@/utils/module'

const lrc = useLrcStore();
const music = useMusicStore();
const { changeTitle, changeLrc } = lrc;
const { changeAudio } = music;

// 页面数据
const data: data = reactive({
    searchList: [],
    searchValue: ''
})

// 搜索逻辑
const search = async () => {
    const res = await request.search(data.searchValue) as searchData;
    data.searchList = res.data
}

// 用户点击搜索结果从而获取相关数据并播放
const changeMusic = async (id: number) => {
    const res = await request.getMusic(id) as musicData;
    changeTitle(res.data.name);
    changeLrc(res.data.lrc);
    changeAudio(res.data.url);
}

// 计算单条音乐的总时长
const computedTime = (time: number) => {
    let oSec: number = Math.floor(time / 1000 % 60);
    let min: number = Math.floor(time / 1000 / 60);
    let sec: string = '00'
    oSec < 10 ? sec = '0' + oSec : sec = oSec.toString()
    return min + ":" + sec;
}
</script>

<template>
    <div class="search">
        <h1>Velpro</h1>
        <div class="search-input">
            <input type="text" placeholder="请输入搜索内容" v-model="data.searchValue" @keydown.enter="search">
            <div class="btn iconfont" @click="search">&#xe608;</div>
        </div>

        <div class="search-results" v-if="data.searchList.length">
            <div class="header">
                <div class="number">#</div>
                <div class="name">名称</div>
                <div class="artists">歌手</div>
                <div class="duration">时长</div>
            </div>
            <div class="list">
                <ul>
                    <li v-for="(item, index) in data.searchList" :key="item.id" @click="changeMusic(item.id)">
                        <div class="number">{{ index < 9 ? ('0' + (index + 1)) : index + 1 }}</div>
                                <div class="name">{{ item.name }}</div>
                                <div class="artists">{{ item.artists[0].name }}</div>
                                <div class="duration">{{ computedTime(item.duration) }}</div>
                    </li>
                </ul>
                <div class="mask"></div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
h1 {
    width: 100%;
    min-width: 300px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    color: #fff;
    font-size: 60px;
    font-weight: 700;
}

.search {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #13131A;

    &-input {
        position: relative;
        width: 35%;
        min-width: 300px;
        height: 50px;
        margin: 0 auto;
        border: 1px solid #76787F;
        border-radius: 25px;
        padding: 0 25px;
        overflow: hidden;

        input {
            width: 100%;
            height: 100%;
            background: transparent;
            border: none;
            color: #fff;
            font-size: 18px;
            font-weight: 600;
        }

        .btn {
            position: absolute;
            right: 25px;
            top: 0;
            width: 50px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #76787F;
            font-size: 22px;
            cursor: pointer;
            background: #13131A;
        }
    }

    &-results {
        margin: 0 auto;
        margin-top: 50px;
        width: 80%;

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            text-align: center;
            color: #fff;
            border-bottom: 1px solid #fff;

            div {
                width: 20%;
                text-align: center;
            }
        }

        .list {
            height: 500px;
            position: relative;
            text-align: center;

            ul {
                position: fixed;
                top: 330px;
                bottom: 10%;
                width: 80%;
                overflow-y: scroll;

                li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 50px;
                    text-align: center;
                    color: #fff;

                    div {
                        width: 20%;
                        text-align: center;
                    }
                }
            }

            .mask {
                position: absolute;
                top: 0;
                right: 0;
                width: 3%;
                height: 100%;
                background: #13131A;
            }
        }
    }
}
</style>