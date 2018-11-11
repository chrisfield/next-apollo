const Index =  ({requestPath}) => (
  <div>Hello from {requestPath}</div>
);

Index.getInitialProps = async({req}) => {
  return {requestPath: req.customProps.requestPath};
};

export default Index;