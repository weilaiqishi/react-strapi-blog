import { useRequest, useSafeState } from 'ahooks'
import React from 'react'

import * as api from '@/api'
import { msgSize } from '@/utils/constant'

import MyPagination from '../MyPagination'
import Divider from './Divider'
import EditBox from './EditBox'
import MsgList from './MsgList'
import Placehold from './Placehold'

interface Props {
  titleEng?: string
  autoScroll?: boolean
  scrollToTop?: number
  title?: string
}

export interface MsgType {
  avatar?: string
  content?: string
  date?: number
  email?: string
  link?: string
  name?: string
  replyId?: string
  _id?: string
}

const Comment: React.FC<Props> = ({
  titleEng = '',
  autoScroll = false,
  scrollToTop = 0,
  title
}) => {
  const [page, setPage] = useSafeState(1)

  // 评论
  const {
    data: msgData,
    loading: msgLoading,
    run: msgRun
  } = useRequest(
    () =>
      api.strapiCommentList({ page, pageSize: msgSize, titleEng }),
    {
      retryCount: 3,
      refreshDeps: [page]
    }
  )

  // 回复
  const {
    data: replys,
    loading: replyLoading,
    run: replyRun
  } = useRequest(
    () =>
      api.strapiCommentList({ page, pageSize: msgSize, titleEng, replyIds: msgData?.data.map((item) => item.id) }),
    {
      manual: true,
      retryCount: 3
    }
  )
  console.log('comment -> ', msgData)

  return (
    <div>
      <Divider />
      <EditBox msgRun={msgRun} title={title} />
      <Placehold msgCount={msgData?.meta.pagination.total} isMsg={titleEng === 'message board'} />
      <MsgList
        msgs={msgData?.data}
        replys={replys?.data}
        loading={msgLoading || replyLoading}
        replyRun={replyRun}
        title={title}
      />
      <MyPagination
        current={page}
        defaultPageSize={msgSize}
        total={msgData?.meta.pagination.total}
        setPage={setPage}
        autoScroll={autoScroll}
        scrollToTop={scrollToTop}
      />
    </div>
  )
}

export default Comment
