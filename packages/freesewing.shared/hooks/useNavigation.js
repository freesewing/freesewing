import tree from '@/site/prebuild/tree'

const useNavigation = (lang='en') => {
  return tree[lang]
}

export default useNavigation
