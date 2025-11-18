import { useDispatch as reduxUseDispatch } from 'react-redux';
import { AppDispatch } from 'store/index.ts';

export const useDispatch = () => reduxUseDispatch<AppDispatch>();
