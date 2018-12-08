import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'next/router'
import Link from 'next/link'

const Header = ({ router: { pathname }, requestPath }) => {

  if (pathname === '/dynamic') {
    pathname = requestPath
  }
  return (
    <header>
      <div>{pathname} </div>
      <Link href='/'>
        <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
      <Link href='/page-one.html'>
        <a className={pathname === '/page-one.html' ? 'is-active' : ''}>Page-One</a>
      </Link>
      <Link prefetch href='/posts'>
        <a className={pathname === '/posts' ? 'is-active' : ''}>Posts</a>
      </Link>
      <Link prefetch href='/about'>
        <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
      </Link>
      <Link prefetch href='/themepage'>
        <a className={pathname === '/themepage' ? 'is-active' : ''}>Themepage</a>
      </Link>
      <Link prefetch href='/other'>
        <a className={pathname === '/other' ? 'is-active' : ''}>Other</a>
      </Link>
      <style jsx>{`
        header {
          margin-bottom: 25px;
        }
        a {
          font-size: 14px;
          margin-right: 15px;
          text-decoration: none;
        }
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </header>
  )
}

const mapStateToProps = (state) => ({
  requestPath: state.session.requestPath
})

export default withRouter(connect(mapStateToProps)(Header))
