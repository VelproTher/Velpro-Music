// 搜索内容
export interface searchData {
    data: Array<{
        id: number
        name: string
        duration: number
        artists: Array<{
            id: number
            name: string
        }>
    }>
}

// 音乐内容
export interface musicData {
    data: {
        id: string
        artist: string
        url: string
        lrc: string
        name: string
    }
}

// 搜索页面数据格式
export interface data {
    searchList: Array<{
        id: number
        name: string
        duration: number
        artists: Array<{
            id: number
            name: string
        }>
    }>
    searchValue: string
}