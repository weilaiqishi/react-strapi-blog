import React from 'react'

import * as api from '@/api'
import LayoutLoading from '@/components/LayoutLoading'

import s from './index.scss'
import MsgItem from './MsgItem'

interface Props {
  msgs?: api.typeStrapiEntityComment[]
  replys?: api.typeStrapiEntityComment[]
  loading?: boolean
  replyRun?: Function
  title?: string
}

const MsgList: React.FC<Props> = ({ msgs, replys, loading, replyRun, title }) => {
  return (
    <>
      {loading ? (
        <LayoutLoading />
      ) : (
        msgs?.map((msg) => {
          return (
            <div key={msg.id} className={s.completeMsg}>
              <MsgItem
                _id={msg.id}
                avatar={msg.attributes.avatar}
                name={msg.attributes.nickName}
                date={msg.attributes.createdAt}
                content={msg.attributes.content}
                email={msg.attributes.email}
                isReply={false}
                replyRun={replyRun}
                title={title}
              />
              {replys
                ?.filter(item => item.attributes.replyId === msg.id)
                .map((reply) => (
                  <MsgItem
                    key={reply.id}
                    _id={reply.id}
                    avatar={reply.attributes.avatar}
                    name={reply.attributes.nickName}
                    date={reply.attributes.createdAt}
                    content={reply.attributes.content}
                    email={reply.attributes.email}
                    isReply={true}
                    replyRun={replyRun}
                    title={title}
                  />
                ))}
            </div>
          )
        })
      )}
    </>
  )
}

export default MsgList
