/**
 * ANGULAR IMPLEMENTATION NOTES:
 * - Implement as standalone component
 * - Use router-outlet for child routes
 */

import { Outlet } from "react-router";
import { Toaster } from 'sonner';
import { IonPage } from '@ionic/react';

export function RootLayout() {
  return (
    <>
      {/* L'Outlet renderizzerà le sotto-pagine */}
      <Outlet />
      <Toaster position="top-right" richColors />
    </>
  );
}
