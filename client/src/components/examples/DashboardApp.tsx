import { DashboardApp } from '../DashboardApp';
import { ThemeProvider } from '../ThemeProvider';

export default function DashboardAppExample() {
  return (
    <ThemeProvider defaultTheme="dark">
      <DashboardApp onLogout={() => console.log('Logged out!')} />
    </ThemeProvider>
  );
}