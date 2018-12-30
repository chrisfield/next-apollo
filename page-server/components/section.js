import { connect } from 'react-redux'

const Section = ({ children, path, section }) => {
  console.log('render section')
  return (
    <div>
      This is a section with path {path}
      <p>
        title: {section.title}
      </p>
      {children}
    </div>
  )
}

const mapStateToProps = state => ({
  section: state.section
})

export default connect(mapStateToProps)(Section)
