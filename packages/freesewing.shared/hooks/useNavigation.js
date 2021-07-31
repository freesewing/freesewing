import tree from '@/site/prebuild/tree'

const useNavigation = (lang='en', path='/') => {
  return tree[lang]
}

export default useNavigation
