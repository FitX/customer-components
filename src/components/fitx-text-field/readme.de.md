
#### Beschreibung:

Für Eingabefelder werden Anforderungen wie Format, max. Länge verwendet.
Per Label (optional separate Komponente) wird dem Nutzenden signalisiert, welche Eingabe er in diesem Feld zu tätigen hat.

#### Verwendung:

Das Input wird verwendet, wenn der Nutzende Eingaben tätigen muss.

Sofern eine Kombination aus Pflichtfeldern und nicht Pflichtfeldern gilt folgendes:
- Sind mehr Pflichtfelder vorhanden werden Optionale Felder mit optional Hinweis Text gekennzeichnet
- Sind mehr Optionale Felder vorhanden, werden Pflichtfelder mit einem Sternchen markiert
  Variationen: Neben Textfeldern und Datumseingaben gibt es noch folgende Varianten:
- Input mit Suchfunktion
- Input mit Formprüfung (Passwort festlegen)
- Input mit Verschlüsselung (Passwort eingeben)

#### Verhalten:

Initial wird das Label im Input angezeigt. 
Bei Klick in das Eingabefeld verschiebt sich das Label nach oben und die Eingabe kann getätigt werden (Floating Label). 
Wird das Input verlassen, erfolgt die Prüfung, ob die Eingabe den Anforderungen entspricht (extra Logik ausserhalb der Komponente).
