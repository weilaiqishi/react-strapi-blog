import useUrlState from '@ahooksjs/use-url-state'
import { UserOutlined } from '@ant-design/icons'
import {
  useBoolean,
  useKeyPress,
  useLocalStorageState,
  useMemoizedFn,
  useMount,
  useRequest,
  useSafeState
} from 'ahooks'
import { message } from 'antd'
import classNames from 'classnames'
import { useLocalObservable, useObserver } from 'mobx-react'
import PubSub from 'pubsub-js'
import React, { useEffect, useRef } from 'react'
import sanitizeHtml from 'sanitize-html'

import * as api from '@/api'
import { rootStore } from '@/mobx'
import { axiosAPI } from '@/utils/apis/axios'
import {
  avatarArrLen,
  defaultCommentAvatarArr,
  emailApi,
  messageBoard,
  myAvatar70,
  myEmail,
  myName,
  QQ
} from '@/utils/constant'
import { getRandomNum } from '@/utils/function'
import { ADD_EMOJI } from '@/utils/pubsub'

import Emoji from './Emoji'
import s from './index.scss'
import PreShow from './PreShow'

interface Props {
  msgRun?: Function
  replyRun?: Function
  isReply?: boolean
  closeReply?: Function
  className?: string
  replyName?: string
  replyId?: number
  title?: string
  ownerEmail?: string
}

const EditBox: React.FC<Props> = ({
  msgRun,
  replyRun,
  isReply = false,
  closeReply,
  replyName,
  replyId,
  className,
  title,
  ownerEmail
}) => {
  const store = useLocalObservable(() => rootStore)
  const [search] = useUrlState()

  const nameRef = useRef(null)
  const [showPre, { toggle: togglePre, setFalse: closePre }] = useBoolean(false)

  const [text, setText] = useSafeState('')

  const [localName, setLocalName] = useLocalStorageState('name')
  const [localEmail, setLocalEmail] = useLocalStorageState('email')
  const [localAvatar, setLocalAvatar] = useLocalStorageState('avatar')

  const validateConfig = {
    name: {
      check: /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,8}$/,
      content: store.uiStore.name,
      errText: '昵称仅限中文、数字、字母，长度2~8！'
    },
    email: {
      check: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
      content: store.uiStore.email,
      errText: '请输入正确的邮箱地址！'
    },
    text: {
      check: /^[\s\S]*.*[^\s][\s\S]*$/,
      content: text,
      errText: '请输入内容再发布~'
    }
  }

  const validate = useMemoizedFn(() => {
    Object.keys(validateConfig).forEach(item => {
      const { check, errText, content } =
        validateConfig[item as keyof typeof validateConfig]
      if (!check.test(content!)) {
        message.error(errText)
        throw new Error('breakForEach')
      }
    })
  })

  const submit = useMemoizedFn(async () => {
    try {
      validate()
      // @ts-ignore
      const isTrue = await api.strapiCommentPost({
        nickName: sanitizeHtml(store.uiStore.name!),
        email: sanitizeHtml(store.uiStore.email!),
        content: sanitizeHtml(text),
        avatar: store.uiStore.avatar
          ? store.uiStore.avatar
          : defaultCommentAvatarArr[getRandomNum(0, avatarArrLen - 1)],
        replyId: replyId || null,
        titleEng: search.title || messageBoard
      })

      if (isTrue) {
        if (isReply) {
          closeReply?.()
          replyRun?.()
          store.uiStore.email !== ownerEmail && informUser()
          informAdminReply()
        } else {
          msgRun?.()
          informAdminMsg()
        }
      } else {
        message.error('发布失败，请重试！')
      }
    } catch { }
  })


  useMount(() => {
    localName && store.uiStore.setName(localName)
    localEmail && store.uiStore.setEmail(localEmail)
    localAvatar && store.uiStore.setAvatar(localAvatar)
  })

  const handleQQ = useMemoizedFn(() => {
    const regQQ = /[1-9][0-9]{4,11}/
    if (regQQ.test(store.uiStore.QQ)) {
      const avatarUrl = `https://q1.qlogo.cn/g?b=qq&nk=${store.uiStore.QQ}&s=100`
      const QQEmail = `${store.uiStore.QQ}@qq.com`
      store.uiStore.setEmail(QQEmail)
      store.uiStore.setAvatar(avatarUrl)
      setLocalEmail(QQEmail)
      setLocalAvatar(avatarUrl)
      return
    }
  })

  useKeyPress(13, handleQQ, {
    target: nameRef
  })

  const openPreShow = useMemoizedFn(() => {
    if (!showPre && !text) {
      message.info('请写点什么再预览~')
      return
    }
    togglePre()
  })

  const { run: informAdminMsg } = useRequest(
    () =>
      axiosAPI(emailApi, 'POST', {
        flag: 0,
        name,
        search: search.title || '',
        content: text,
        title
      }),
    {
      manual: true,
      onSuccess: () => {
        setText('')
        message.success(`发布${search.title ? '评论' : '留言'}成功！`)
      }
    }
  )

  const { run: informAdminReply } = useRequest(
    () =>
      axiosAPI(emailApi, 'POST', {
        flag: 1,
        owner: replyName,
        name,
        search: search.title || '',
        content: text,
        title
      }),
    {
      manual: true,
      onSuccess: () => {
        setText('')
        message.success('已通知站长！')
      }
    }
  )

  const { run: informUser } = useRequest(
    () =>
      axiosAPI(emailApi, 'POST', {
        flag: 2,
        owner: replyName,
        email: ownerEmail,
        name,
        search: search.title || '',
        content: text,
        title
      }),
    {
      manual: true,
      onSuccess: () => {
        message.success(`已通知${search.title ? '评论' : '留言'}者！`)
      }
    }
  )

  useEffect(() => {
    const subEmoji = PubSub.subscribe(ADD_EMOJI, (_, emoji) => {
      setText(text => `${text}${emoji}`)
    })
    return () => {
      PubSub.unsubscribe(subEmoji)
    }
  }, [])

  return useObserver(() =>
    <div className={classNames(s.editBox, className)}>
      {isReply && (
        <div className={s.replyNameBox}>
          回复给「<span>{replyName}</span>」：
        </div>
      )}
      <div className={s.flex}>
        <div className={s.avatarBoxCol}>
          <div className={s.avatarBox}>
            {store.uiStore.avatar ? (
              <img src={store.uiStore.avatar} className={s.editAvatar} />
            ) : (
              <UserOutlined className={s.noAvatar} />
            )}
          </div>
        </div>
        <div className={s.editInputBox}>
          <div className={s.inputBox}>
            <div className={classNames(s.inputInfo, s.flex2)}>
              <div className={s.inputKey}>QQ号</div>
              <input
                ref={nameRef}
                type='text'
                className={s.inputValue}
                placeholder='QQ号'
                value={store.uiStore.QQ}
                onChange={e => store.uiStore.setQQ(e.target.value)}
                onBlur={handleQQ}
              />
            </div>
            <div className={classNames(s.inputInfo, s.flex2)}>
              <div className={s.inputKey}>昵称</div>
              <input
                ref={nameRef}
                type='text'
                className={s.inputValue}
                placeholder='昵称'
                value={store.uiStore.name}
                onChange={e => store.uiStore.setName(e.target.value)}
                onBlur={e => setLocalName(e.target.value)}
              />
            </div>
            <div className={classNames(s.inputInfo, s.flex3)}>
              <div className={s.inputKey}>邮箱</div>
              <input
                type='text'
                className={s.inputValue}
                placeholder='必填'
                value={store.uiStore.email}
                onChange={e => store.uiStore.setEmail(e.target.value)}
                onBlur={e => setLocalEmail(e.target.value)}
              />
            </div>
          </div>

          <div className={s.textareaBox}>
            <textarea
              className={s.textarea}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder='写点什么吗？支持markdown格式！&#10可以在「昵称」处填写QQ号，自动获取「头像」和「QQ邮箱」！'
            />
          </div>
          <div className={s.commentBtns}>
            <Emoji />
            {isReply && (
              <div className={s.cancelBtn} onClick={() => closeReply?.()}>
                取消
              </div>
            )}
            <div className={s.previewBtn} onClick={openPreShow}>
              预览
            </div>
            <div className={s.sendBtn} onClick={submit}>
              {isReply ? '回复' : ' 发布'}
            </div>
          </div>
        </div>
      </div>
      {showPre && <PreShow closePre={closePre} content={text} />}
    </div>
  )
}

export default EditBox
