export const randomPoster = (data) => {
    return Math.floor(Math.random() * data.length)
}

export const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n-1) + "..." : str
}

export const opts = {
    height: "100%",
    width: "100%",
    control: 1,
    showinfo: 0,
    playsinline:0,
    playerVars: {
        autoplay: 1,
    }
}

