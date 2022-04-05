import { useRequest, useSafeState } from 'ahooks'
import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import * as api from '@/api'
import MyPagination from '@/components/MyPagination'
import { storeState } from '@/redux/interface'
import { DB } from '@/utils/apis/dbConfig'
import { homeSize, staleTime } from '@/utils/constant'

import s from './index.scss';
import PostCard from './PostCard';

interface Props {
  artSum?: number;
}

const Section: React.FC<Props> = ({ artSum }) => {
  const navigate = useNavigate();
  const [page, setPage] = useSafeState(1);

  const { data, loading } = useRequest(
    () => api.strapiGETArticleList(),
    {
      retryCount: 3,
      refreshDeps: [page],
      cacheKey: `Section-${DB.Article}-${page}`,
      staleTime
    }
  );

  console.log(data)

  return (
    <section className={s.section}>
      {data?.data?.map(({ id, attributes: { title, content, createdAt, tags, titleEng } }) => (
        <PostCard
          key={id}
          title={title}
          content={content}
          date={createdAt}
          tags={tags}
          loading={loading}
          onClick={() => navigate(`/post?title=${encodeURIComponent(titleEng)}`)}
        />
      ))}
      <MyPagination
        current={page}
        defaultPageSize={homeSize}
        total={artSum}
        setPage={setPage}
        autoScroll={true}
        scrollToTop={document.body.clientHeight - 80}
      />
    </section>
  );
};

export default connect((state: storeState) => ({ artSum: state.artSum }))(Section);
