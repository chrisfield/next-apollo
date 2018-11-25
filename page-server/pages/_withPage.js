const withPage = (Component) => (
  (props) => (
    <div>
      from with page...
      <Component {...props}/>
    </div>
  )
);

export default withPage;