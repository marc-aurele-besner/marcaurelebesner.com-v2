import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import emailjs from 'emailjs-com'

import ArrowDown from './ArrowDown'

type GLTFResult = GLTF & {
  nodes: {
    Cube008: THREE.Mesh
    Cube008_1: THREE.Mesh
    Cube008_2: THREE.Mesh
    keyboard: THREE.Mesh
    Cube002: THREE.Mesh
    Cube002_1: THREE.Mesh
    touchbar: THREE.Mesh
  }
  materials: {
    aluminium: THREE.MeshStandardMaterial
    ['matte.001']: THREE.MeshStandardMaterial
    ['screen.001']: THREE.MeshStandardMaterial
    keys: THREE.MeshStandardMaterial
    trackpad: THREE.MeshStandardMaterial
    touchbar: THREE.MeshStandardMaterial
  }
}

interface ContactFormProps {
  switchColor: number
  contact: boolean
  setContact: (contact: boolean) => void
}

interface ContactFormState {
  from_name: string
  email: string
  message: string
}

const ContactForm: React.FC<ContactFormProps> = ({ contact, setContact }) => {
  const [send, setSend] = useState(false)
  const [state, setState] = useState<ContactFormState>({
    from_name: '',
    email: '',
    message: '',
  })
  // eslint-disable-next-line
  const { from_name, email, message } = state
  // eslint-disable-next-line
  const [fieldsState, setFieldsState] = useState<{ [key: string]: boolean }>({})

  // eslint-disable-next-line
  const handleChange = (e: any) => {
    const { name, value } = e.target
    setState((prevState) => ({ ...prevState, [name]: value }))
  }

  const clearState = () => setState({
    from_name: '',
    email: '',
    message: '',
  })
  // eslint-disable-next-line
  const handleSubmit = (e: any) => {
    e.preventDefault()
    emailjs
      .sendForm(
        'service_1sb6a0i', 'template_x97lb1h', e.target, 'user_cO7i9lY0LQpelKqXwQnB7'
      )
      .then(
        () => {
          clearState()
          setSend(true)
          // wait for 2 seconds and then close the modal
          setTimeout(() => {
            setContact(!contact)
          }, 2000)
        },
        (error) => {
          console.error(error.text)
        }
      ) 
  }
  return (
    <>
      <div className="relative bg-gray-50">
        <form id="form" onSubmit={handleSubmit}>
          Your name:
          <br />
          <input
            type="text"
            name="from_name"
            id="from_name"
            value={from_name}
            required
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          <br />
          Your e-mail:
          <br />
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            required
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          <br />
          Your message:
          <br />
          <textarea
            name="message"
            id="message"
            value={message}
            required
            onChange={handleChange}
            rows={4}
            cols={40}
          />
          <br />
          <br />
          <div className="justify-center">
            {send ? (
              <span>
                Your message has been sent!
              </span>
            ) : (
              <input
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                value="Send me your message"
                onClick={() => handleSubmit}
                disabled={send} />
            )}
          </div>
        </form>
      </div>
    </>
  )
}

interface MacProps {
  position: THREE.Vector3
  rotation: THREE.Euler
  scale: THREE.Vector3
  clicked: boolean
  switchColor: number
  contact: boolean
  setContact: (contact: boolean) => void
}

const MacContactForm: React.FC<MacProps> = ({ clicked, switchColor, contact, setContact, ...props }) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/mac.glb') as GLTFResult
  
  if (contact) {
    return (
      <group 
        ref={group}
        dispose={null}
        {...props}>
        <group position={[0, -0.04, 0.41]} rotation={[0.01, 0, 0]}>
          <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={nodes.Cube008_1.geometry} material={materials['matte.001']} />
            {clicked && (
              <Html className="content" rotation-x={-Math.PI / 2} position={[0, 0.05, -0.09]} transform occlude>
                <div className="wrapper">
                  <ContactForm 
                    switchColor={switchColor}
                    contact={contact}
                    setContact={setContact}
                  />
                </div>
              </Html>
            )}
          </group>
        </group>
        <mesh geometry={nodes.keyboard.geometry} material={materials.keys} position={[1.79, 0, 3.45]} />
        <group position={[0, -0.1, 3.39]}>
          <mesh geometry={nodes.Cube002.geometry} material={nodes.Cube002.material} />
          <mesh 
            geometry={nodes.Cube002_1.geometry} 
            material={materials.trackpad}
            onClick={() => setContact(!contact)} 
          />
        </group>
        <mesh geometry={nodes.touchbar.geometry} material={materials.touchbar} position={[0, -0.03, 1.2]} />
        <group 
          position={[7, -3, 1.2]}
          rotation={[0, Math.PI / 2, 0]}>
          <ArrowDown 
            contact={contact}
            setContact={setContact}
            {...props}
          />
        </group>
      </group>
    )
  }
  return null
}

export default MacContactForm