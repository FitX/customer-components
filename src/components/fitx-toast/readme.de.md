
#### Beschreibung:
Zur Kommunikation mit dem Nutzenden werden die Toast Notifikationen eingesetzt, 
in Reaktion auf eine Interaktion des Nutzenden mit der Applikation.

#### Verwendung:
- Grüne Notification (state: success) bestätigen eine erfolgreiche Aktion,
- Rote Notification (state: error) signalisieren, dass ein Fehler aufgetreten ist und die Aktion nicht stattgefunden hat.
- Das entsprechende Composable `useToast` steht als Export zur Verfügung. [useToast](/docs/composables-use-toast--docs)

#### Verhalten:
- Die Notifications werden vom unteren Seitenrand her ein- und ausgeblendet. 
- Das Positionierungs-Styling der Toast Notifikationen passiert in den Applikationen.
- Die Success Toasts werden nach 6 Sekunden automatisch ausgeblendet. 
- Die Error Toasts müssen vom Nutzenden manuell ausgeblendet werden.

#### Zugänglichkeit:
Jeder Toastnachricht wird eine entsprechende Rolle zugewiesen, um sicherzustellen, dass Screenreader-Benutzer effektiv informiert werden:

Fehlermeldungen (vom Typ `error`) wird die Rolle `alert` zugewiesen, die angibt, dass die Meldung sofort von Screenreadern angesagt werden soll.
Success-Fehlermeldungen erhalten die Rollen `status`, welche weniger Dringlichkeit vermittelt und passiver angekündigt wird.

Die Komponente sollte mit Live-Regionen verwendet werden, 
um die Zugänglichkeit sicherzustellen und Echtzeit-Updates für Benutzer bereitzustellen, 
die auf unterstützende Technologien angewiesen sind.
