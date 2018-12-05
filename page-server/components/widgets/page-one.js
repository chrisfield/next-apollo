const PageOne = ({ children }) => {
  console.log('render page-one')
  return (
    <div>
      This is a page one
      {children}
    </div>
  )
}

export default PageOne