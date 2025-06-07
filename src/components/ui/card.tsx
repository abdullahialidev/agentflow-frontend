export function Card({ children, className = "", ...props }: any) {
    return (
      <div className={`rounded-xl bg-gray-800 ${className}`} {...props}>
        {children}
      </div>
    );
  }
  
  export function CardContent({ children, className = "" }: any) {
    return <div className={`p-4 ${className}`}>{children}</div>;
  }
  