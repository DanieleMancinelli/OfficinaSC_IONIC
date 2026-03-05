/**
 * ANGULAR IMPLEMENTATION NOTES FOR ENTIRE APPLICATION:
 * * ARCHITECTURE:
 * - Use standalone components throughout (no NgModules)
 * - Implement signals for reactive state management
 * - Create dedicated services for business logic
 * * SERVICES TO CREATE:
 * 1. AuthService - Handle authentication, login/logout, token management
 * 2. PraticheService - Manage pratiche state with signals, CRUD operations
 * 3. NotificationService - Handle real-time notifications for new pratiche
 * 4. StateService - Manage global application state with signals
 * * SIGNAL USAGE:
 * - pratiche = signal<Pratica[]>([])
 * - notifiche = signal<number>(0)
 * - isAuthenticated = signal<boolean>(false)
 * - currentUser = signal<User | null>(null)
 * * ROUTING:
 * - Implement route guards (AuthGuard)
 * - Use lazy loading for feature modules
 * - Protect dashboard routes
 */

import { RouterProvider } from 'react-router';
import { router } from './routes';
import { IonApp } from '@ionic/react'; // <-- Import Ionic

function App() {
  return (
    <IonApp>
      <RouterProvider router={router} />
    </IonApp>
  );
}

export default App;
