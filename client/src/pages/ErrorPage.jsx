const ErrorPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <a href="/">Go back to Home</a>
    </div>
  );
};

export default ErrorPage;
// This component can be used in your main application file to handle 404 errors.
// You can import and use it in your router configuration like this:
// import ErrorPage from './ErrorPage';