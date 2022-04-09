import { useQuery } from '@apollo/client'
import { useRequest } from 'ahooks'
import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import * as api from '@/api'
import Card from '@/components/Card'
import { setArtSum } from '@/redux/actions'
import { DB } from '@/utils/apis/dbConfig'
import { staleTime } from '@/utils/constant'

import { fetchData } from './fetchData'
import s from './index.scss'

interface Props {
  setArtSum?: Function
}

const DataCard: React.FC<Props> = ({ setArtSum }) => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<api.typeArticleNums>(api.articleNumsQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data)

  return (
    <Card className={s.card} loading={loading}>
      <div className={s.blogData} onClick={() => navigate('/articles')}>
        <div className={s.name}>文章</div>
        <div className={s.num}>{data?.articles.meta.pagination.total}</div>
      </div>
      <div className={s.blogData} onClick={() => navigate('/categories')}>
        <div className={s.name}>分类</div>
        <div className={s.num}>{data?.categories.meta.pagination.total}</div>
      </div>
      <div className={s.blogData} onClick={() => navigate('/tags')}>
        <div className={s.name}>标签</div>
        <div className={s.num}>{data?.tags.meta.pagination.total}</div>
      </div>
    </Card>
  );
};

export default connect(() => ({}), {
  setArtSum
})(DataCard)
