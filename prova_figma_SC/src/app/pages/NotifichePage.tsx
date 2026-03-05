/**
 * ANGULAR IMPLEMENTATION NOTES:
 * - Implement as standalone component
 * - Protect with AuthGuard
 * - Use NotificationService
 */

import { Notifiche } from "../components/Notifiche";
import { IonPage, IonContent } from '@ionic/react';

export function NotifichePage() {
  return (
    <IonPage>
      <IonContent>
        <Notifiche />
      </IonContent>
    </IonPage>
  );
}
