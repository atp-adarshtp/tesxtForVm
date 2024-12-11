import React from "react";
import ProxmoxConsole from "./ProxmoxConsole";

const App = () => {
  return (
    <div>
      <h1>Proxmox VM Console</h1>
      <ProxmoxConsole
        node="dcuk01p050" // Replace with your Proxmox node name
        vmid="103" // Replace with your VM ID
        proxmoxUrl="https://dcuk01p001.uk.dewdrive.com" // Replace with your Proxmox URL
        username="root" // Replace with your Proxmox username
        password="4fbff2494dR" // Replace with your Proxmox password
      />
    </div>
  );
};

export default App;
