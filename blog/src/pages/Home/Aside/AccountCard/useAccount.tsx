import { GithubOutlined} from '@ant-design/icons';
import React from 'react';

import { githubUrl } from '@/utils/constant';


export const useAccount = () => {
  return [
    {
      isLink: true,
      link: githubUrl,
      ico: <GithubOutlined />,
      content: null
    }
  ];
};
