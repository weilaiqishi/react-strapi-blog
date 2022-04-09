import { useRequest } from 'ahooks';
import React from 'react';

import * as api from '@/api'
import Card from '@/components/Card';
import { DB } from '@/utils/apis/dbConfig';
import { getOrderData } from '@/utils/apis/getOrderData';
import { staleTime } from '@/utils/constant';

import s from './index.scss';

const NoticeCard: React.FC = () => {
  const { data, loading } = useRequest(() => api.strapiNoticeList({}), {
    retryCount: 3,
    cacheKey: `NoticeCard-notice`,
    staleTime
  });

  return (
    <Card loading={loading}>
      <div className={s.notice}>{data?.data[0].attributes.text}</div>
    </Card>
  );
};

export default NoticeCard;
