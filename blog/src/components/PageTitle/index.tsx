import classNames from 'classnames';
import React, { Profiler } from 'react';

import s from './index.scss';

interface Props {
  title?: string;
  desc?: string;
  className?: string;
  children?: any
}

const PageTitle: React.FC<Props> = ({ title, desc, className, children }) => {
  return (
    <Profiler id="homeTitle" onRender={(...e) => {
      console.log('Profiler homeTitle -> ', e)
    }}>
    <div className={classNames(s.box, className)}>
      <div className={s.title}>{title}</div>
      {desc && <div className={s.desc}>{desc}</div>}
      {children}
    </div>
    </Profiler>
  );
};

export default PageTitle;
