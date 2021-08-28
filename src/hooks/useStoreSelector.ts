import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from 'store/store';

const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useStoreSelector;