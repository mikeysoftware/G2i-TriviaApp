import { useDispatch } from 'react-redux'
import type { StoreDispatch } from 'store/store';

const useStoreDispatch = (): StoreDispatch => useDispatch<StoreDispatch>()

export default useStoreDispatch;