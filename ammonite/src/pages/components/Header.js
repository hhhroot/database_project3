import React from 'react'

const Header = () => {
    return (
        <header className="header">
          <center>
          <h1>COVID-19</h1>
          <select>
            <option>국내</option>
            <option>해외</option>
          </select>
          </center>
        </header>
    )
}

export default Header
