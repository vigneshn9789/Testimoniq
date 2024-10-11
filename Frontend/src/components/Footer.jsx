import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-5">
    <div className="container mx-auto px-4 text-center">
      <p>&copy; {new Date().getFullYear()} Testimoniq.. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer