import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => setUser(data))
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const users = { name, email }
    console.log(users)
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(users),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUser = [...user, data]
        setUser(newUser)
        console.log(data)
      })
      .catch((e) => console.log(e))
    e.target.reset()
  }

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' id='' required placeholder='name' />
        <input type='email' name='email' id='' required placeholder='email' />
        <button type='submit'>add user</button>
      </form>
      <h1>User:{user.length}</h1>
      <div>
        {user.map((us) => (
          <p key={us._id}>
            {us.email}
            {us.name}
          </p>
        ))}
      </div>
    </div>
  )
}

export default App
