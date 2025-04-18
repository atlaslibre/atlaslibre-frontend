import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { useMediaQuery } from '@mui/material'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const useColorMode = () => {
  const { colorMode } = useAppSelector((state) => state.flags);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return function c<T>(light: T, dark: T): T {
    if (colorMode == "system") return prefersDarkMode ? dark : light;
    return colorMode == "light" ? light : dark;
  }
}