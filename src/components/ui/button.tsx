export function Button({ children, className = "", ...props }: any) {
    return (
      <button
        className={`px-4 py-2 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  