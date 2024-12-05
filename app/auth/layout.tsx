const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            {children}
        </div>
    )
}

export default AuthLayout;