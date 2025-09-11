import { AppSidebar } from '../Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function SidebarExample() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar onNavigate={(path) => console.log('Navigate to:', path)} />
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Main Content Area</h2>
          <p className="text-muted-foreground">This is where the main dashboard content would appear.</p>
        </div>
      </div>
    </SidebarProvider>
  );
}