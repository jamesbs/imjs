export const Main = () => {
  return (
    <div>
      this is the main component
      <button
        onClick={() => {
          location.href = '/auth/github'
        }}
      >
        login
      </button>
      <button
        onClick={() => {
          location.href = '/logout'
        }}
      >
        logout
      </button>
    </div>
  )
}
