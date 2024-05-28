# useMaintenance

A reactive interval function for checking and responding to the maintenance mode.

## Usage

```ts
import { useMaintenance } from '@fitx/customer-components';
const {
  startMaintenanceObserver, // init Interval
  reCheck, // manual Trigger getMaintenanceStatus function
  isInMaintenanceMode // readonly reactive Result from getMaintenanceStatus,
} = useMaintenance({
  interval: 600000, // optional in ms, default 600000 (10 minutes)
  // boolean | Promise<boolean> | (() => boolean) | (() => Promise<boolean>)
  getMaintenanceStatus: async () => mayBeGetStudioMaintenanceMode(toValue(studioId)),
});

startMaintenanceObserver();
```
