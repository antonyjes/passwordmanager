import { Navbar } from "./_components/navbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-[80vh]">
        {children}
      </div>
    </div>
  );
};

export default ProtectedLayout;
