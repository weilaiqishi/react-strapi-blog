import './global.custom.scss';

import { useLocalStorageState, useMount } from 'ahooks';
import classNames from 'classnames';
import { useLocalObservable, useObserver } from 'mobx-react'
import React from 'react';

import Footer from '@/components/Footer';
import Main from '@/components/Main';
import Nav from '@/components/Nav';
import { rootStore } from '@/mobx';

import s from './App.scss';
import BackToTop from './components/BackToTop';

interface Props {
  mode?: number;
  setMode?: Function;
}

const App: React.FC<Props> = () => {
  const store = useLocalObservable(() => rootStore)
  const bgClasses = [s.bg0, s.bg1, s.bg2];
  const [localMode] = useLocalStorageState('localMode');

  useMount(() => {
    if (localMode !== undefined) {
      store.uiStore.setMode(localMode);
    }
  });

  return useObserver(() =>
    <div className={classNames(s.AppBox, bgClasses[store.uiStore.mode])}>
      <Nav />
      <Main />
      <Footer />
      <BackToTop />
    </div>
  );
};

export default App
