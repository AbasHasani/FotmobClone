"use client";

const ErrorPage = ({
  reset,
  error,
}: {
  reset: () => void;
  error: Error & { digest?: string };
}) => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <p>{error?.message}</p>
      <p>This is the error page.</p>
      <button
        onClick={reset}
        className="p-3 rounded-sm text-black bg-red-800/80 text-lg"
      >
        Reset
      </button>
    </div>
  );
};

export default ErrorPage;
