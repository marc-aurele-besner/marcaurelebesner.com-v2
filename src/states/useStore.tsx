import create from 'zustand'
import socialMedial, { SocialMediaProps } from './useSocialMedial'

const SocialMedia = [...socialMedial]

interface StoreProps {
    social?: SocialMediaProps[]
}

const useStore = create<StoreProps>(set => ({
    social: SocialMedia,
    setPosition: (position: number) => set(state => ({ ...state, position })),
}))

export default useStore