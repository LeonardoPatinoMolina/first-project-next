import React,{useState} from 'react'
import {useRouter} from 'next/router'

export default function Profile() {
  const router = useRouter();
  const [jsonData, setJsonData] = useState({
    user: ''
  });
  
  const getProfile = async ()=>{
    const res = await fetch('api/auth/profile');
    const data = await res.json();
    setJsonData(data);
  }

  const logout = async ()=>{
    const response = await fetch('api/auth/logout')
    const data = await response.json();
    console.log('logout', data);
    router.push('/login')
  }
  return (
    <div>
      <h2>profile</h2>
      <pre>{JSON.stringify(jsonData)}</pre>
      <p>profile... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti molestias ex ab quia est nemo cum consequatur, magni quis reiciendis aliquid, id atque, illo explicabo quod obcaecati quibusdam recusandae cumque.
      </p>
      <button onClick={getProfile}>GET PROFILE</button>
      <button onClick={logout}>LOGAUT PROFILE</button>
    </div>
  )
}
