import { useMount, useSafeState, useTitle } from 'ahooks'
import React from 'react'
import { connect } from 'react-redux'

import PageTitle from '@/components/PageTitle'
import { setNavShow } from '@/redux/actions'
import { siteTitle } from '@/utils/constant'
import useTop from '@/utils/hooks/useTop'
import jinrishici from '@/utils/jinrishici'

import Aside from './Aside';
import s from './index.scss';
import Section from './Section';

interface Props {
  setNavShow?: Function;
}


const Home: React.FC<Props> = ({ setNavShow }) => {
  useTitle(siteTitle)
  setNavShow && useTop(setNavShow)

  const [poem, setPoem] = useSafeState('')
  useMount(() => {
    jinrishici(
      res => setPoem(res.data.content),
      err => { console.log(`jinrishici error -> ` + err) }
    );
  });

  return (
    <>
      <PageTitle title={siteTitle} desc={poem || ''} className={s.homeTitle} />
      <div className={s.body}>
        <Section />
        <Aside />
      </div>
    </>
  );
};

export default connect(() => ({}), { setNavShow })(Home)
