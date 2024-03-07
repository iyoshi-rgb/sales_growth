import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <nav className="w-full border-b border-b-foreground/10 flex justify-center text-center text-xs">
    <div className="w-full flex justify-between items-center p-3 text-sm">
      Sales growth
      <AuthButton />
    </div>
  </nav>
    );
  }

