import { useRequest } from 'ahooks';
import React from 'react';

import * as api from '@/api'
import Card from '@/components/Card';
import { DB } from '@/utils/apis/dbConfig';
import { siteCountStale } from '@/utils/constant';

import s from './index.scss';
import { useRunTime } from './useRunTime';

const SiteCard: React.FC = () => {
  const { runTime } = useRunTime();

  const { data, loading } = useRequest(api.strapiPageviewCount, {
    retryCount: 3,
    cacheKey: `SiteCard-${DB.Count}`,
    staleTime: siteCountStale
  });

  return (
    <Card className={s.card} loading={loading}>
      <div className={s.item}>
        <span className={s.key}>总浏览量</span>
        <span className={s.value}>{data}次</span>
      </div>
      <div className={s.item}>
        <span className={s.key}>运行时间</span>
        <span className={s.value}>{runTime}天</span>
      </div>
    </Card>
  );
};

export default SiteCard;
