interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="w-full h-60 bg-[#EFF5FF] rounded-lg shadow-md">
      {children}
    </div>
  );
}
