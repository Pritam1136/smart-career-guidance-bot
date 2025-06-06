const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-700 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Go back to Home
      </a>
    </div>
  );
};

export default ErrorPage;
