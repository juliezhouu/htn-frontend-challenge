import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // state to store the events
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // login state
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  
  // search state
  const [searchQuery, setSearchQuery] = useState('')

  // fetch events from the API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://api.hackthenorth.com/v3/events')
        
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        
        const data = await response.json()
        
        // sort events by start_time 
        const sortedEvents = data.sort((a, b) => a.start_time - b.start_time)
        
        setEvents(sortedEvents)
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, []) 


  const handleLogin = (e) => {
    e.preventDefault()
    
    // Hardcoded credentials
    if (username === 'hacker' && password === 'htn2026') {
      setIsLoggedIn(true)
      setLoginError('')
      setUsername('')
      setPassword('')
    } else {
      setLoginError('Invalid username or password')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
  }

  // Filter events based on login status and search query
  const displayedEvents = events.filter(event => {
    // First, filter by permission
    const hasPermission = isLoggedIn || !event.permission || event.permission === 'public'
    
    if (!hasPermission) return false
    
    // Then, filter by search query
    if (!searchQuery.trim()) return true
    
    const query = searchQuery.toLowerCase()
    const matchesName = event.name.toLowerCase().includes(query)
    const matchesDescription = event.description?.toLowerCase().includes(query)
    const matchesType = event.event_type.toLowerCase().includes(query)
    const matchesSpeakers = event.speakers.some(speaker => 
      speaker.name.toLowerCase().includes(query)
    )
    
    return matchesName || matchesDescription || matchesType || matchesSpeakers
  })

  //loading msg
  if (loading) {
    return <div className="app"><h1>Loading events...👨‍❤️‍👨</h1></div>
  }

  // error msg (if something went wrong)
  if (error) {
    return <div className="app"><h1>Error: {error}</h1></div>
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Hack the North Events</h1>
        
        {/* Login/Logout Section */}
        {!isLoggedIn ? (
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <button type="submit" className="login-button">Login</button>
            {loginError && <p className="error-message">{loginError}</p>}
          </form>
        ) : (
          <div className="logged-in-info">
            <span>Welcome, hacker! 🎉</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        )}
      </header>
      
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search events"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')} 
            className="clear-search"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      
      <p className="event-count">
        Showing {displayedEvents.length} of {events.length} events
        {!isLoggedIn && <span className="hint"> (Login to see all events)</span>}
        {searchQuery && <span className="hint"> · Filtered by: "{searchQuery}"</span>}
      </p>
      
      <div className="events-list">
        {displayedEvents.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <h2>{event.name}</h2>
              {event.permission === 'private' && (
                <span className="private-badge">🔒 Private</span>
              )}
            </div>
            <p><strong>Type:</strong> {event.event_type}</p>
            <p><strong>Start:</strong> {new Date(event.start_time).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(event.end_time).toLocaleString()}</p>
            {event.description && <p>{event.description}</p>}
            {event.speakers.length > 0 && (
              <p><strong>Speakers:</strong> {event.speakers.map(s => s.name).join(', ')}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
