import axios from 'axios'
import type { searchData, musicData } from './module'

axios.defaults.baseURL = 'https://api.velpro.top/';

axios.defaults.timeout = 5000;

axios.interceptors.request.use(
    config => config,
    error => Promise.reject(error)
);

axios.interceptors.response.use(
    response => {
        return Promise.resolve(response);
    },
    error => {
        console.log(`异常请求：${JSON.stringify(error.message)}`);
    }
);

export default {
    // 搜索
    search(value: string) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: 'search?value=' + value
            }).then((res: searchData) => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },

    // 获取单条音乐数据
    getMusic(id: number) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: 'music?id=' + id
            }).then((res: musicData) => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
}