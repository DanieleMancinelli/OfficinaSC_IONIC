import { Dashboard } from '../components/Dashboard';
import { IonPage, IonContent } from '@ionic/react';

export function DashboardPage() {
  return (
    <IonPage>
      {/* Niente classi extra, lasciamo fare a Tailwind */}
      <IonContent>
        <Dashboard />
      </IonContent>
    </IonPage>
  );
}
