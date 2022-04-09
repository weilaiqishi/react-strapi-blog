import { DB } from '@/utils/apis/dbConfig';
import { getSum } from '@/utils/apis/getSum';

export const fetchData = async () => {
  const [articles, categories, tags] = await Promise.all([
    getSum(DB.Article),
    getSum(DB.Class),
    getSum(DB.Tag)
  ]);

  return {
    articles,
    categories,
    tags
  };
};
