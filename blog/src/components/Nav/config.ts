export const useLinkList = () => {
  const navArr = [
    { name: '图库', to: '/gallery' },
    { name: '留言', to: '/msg' },
    { name: '友链', to: '/link' }
  ]
  const secondNavArr = [
    { name: '找文章', to: '/articles' },
    { name: '分类', to: '/categories' },
    { name: '标签', to: '/tags' }
  ]

  const mobileNavArr = [
    { name: '主页', to: '/' },
    { name: '文章', to: '/articles' },
    { name: '分类', to: '/categories' },
    { name: '标签', to: '/tags' },
    { name: '图库', to: '/gallery' },
    { name: '留言', to: '/msg' },
    { name: '友链', to: '/link' }
  ]

  return {
    navArr,
    secondNavArr,
    mobileNavArr
  }
}
