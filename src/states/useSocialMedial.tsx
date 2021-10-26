import * as THREE from 'three'

export interface SocialMediaProps {
    type: string
    link: string
    behavior: string
    position: THREE.Vector3
}

const socialMedial: SocialMediaProps[] = [
    {
        type: 'linkin',
        link: 'https://ca.linkedin.com/in/marc-aur%C3%A8le-besner-66b1a7a7',
        behavior: 'link',
        position: new THREE.Vector3(-1.5, 0.25, 1)
    },
    {
        type: 'github',
        link: 'https://github.com/marc-aurele-besner',
        behavior: 'link',
        position: new THREE.Vector3(-1, 0.25, 1)
    },
    {
        type: 'gmail',
        link: 'contactForm',
        behavior: 'link',
        position: new THREE.Vector3(-0.5, 0.25, 1)
    },
    {
        type: 'facebook',
        link: 'https://www.facebook.com/mbesner',
        behavior: 'link',
        position: new THREE.Vector3(0, 0.25, 1)
    },
    {
        type: 'instagram',
        link: 'https://www.instagram.com/mabesner',
        behavior: 'link',
        position: new THREE.Vector3(0.5, 0.25, 1)
    }
]

export default socialMedial