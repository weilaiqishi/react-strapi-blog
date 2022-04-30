import { messageBoard } from '@/utils/constant'
export const uiStore = {
    navShow: true,
    setNavShow(isShow: boolean) {
        this.navShow = isShow
    },
    QQ: '',
    setQQ(QQ: string) {
        this.QQ = QQ
    },
    name: '',
    setName(name: string) {
        this.name = name
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
    },

    toArticleDetailOrMsg(titleEng, navigate) {
        if (titleEng === messageBoard) {
            navigate(`/msg`)
            return
        }
        navigate(`/post?title=${encodeURIComponent(titleEng)}`)
    }
}