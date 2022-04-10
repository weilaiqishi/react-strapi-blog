export const uiStore = {
    navShow: true,
    setNavShow(isShow: boolean) {
        this.navShow = isShow
    },
    name: '',
    setName(name: string) {
        this.name = name
    },
    link: '',
    setLink(link: string) {
        this.link = link
    },
    email: '',
    setEmail(email: string) {
        this.email = email
    },
    avatar: '',
    setAvatar(avatar: string) {
        this.avatar = avatar
    },
    mode: 0,
    setMode(mode: number) {
        this.mode = mode
    }
}