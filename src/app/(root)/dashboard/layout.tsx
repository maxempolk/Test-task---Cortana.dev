import Sidebar from "./components/sidebar/Sidebar";

export default async function DashboardLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-2 h-full border-r p-4">
        <Sidebar />
      </div>
      <div className="col-span-10 p-4">
        {children}
      </div>
    </div>
  )
}