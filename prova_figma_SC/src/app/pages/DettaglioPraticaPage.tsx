/**
 * ANGULAR IMPLEMENTATION NOTES:
 * - Implement as standalone component
 * - Protect with AuthGuard
 * - Use PraticaService to fetch data
 */

import { DettaglioPratica } from "../components/DettaglioPratica";
import { IonPage, IonContent } from '@ionic/react';

export function DettaglioPraticaPage() {
  return (
    <IonPage>
      <IonContent>
        <DettaglioPratica />
      </IonContent>
    </IonPage>
  );
}
