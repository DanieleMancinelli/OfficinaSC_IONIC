/**
 * ANGULAR IMPLEMENTATION NOTES:
 * - Implement as standalone component
 * - Use AuthService for authentication
 * - Navigate to /dashboard after successful login
 */

import { useNavigate } from "react-router";
import { Login } from "../components/Login";
import { IonPage, IonContent } from '@ionic/react';

export function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <IonPage>
      <IonContent>
        <Login onLogin={handleLogin} />
      </IonContent>
    </IonPage>
  );
}
