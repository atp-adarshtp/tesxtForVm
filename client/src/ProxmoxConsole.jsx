import React, { useEffect, useState } from "react";
import { VncDisplay } from "react-novnc";
import axios from "axios";

const ProxmoxConsole = ({ node, vmid, proxmoxUrl, username, password }) => {
  const [ticket, setTicket] = useState(null);
  const [webSocketUrl, setWebSocketUrl] = useState("");

  useEffect(() => {
    const authenticate = async () => {
      try {
        // Step 1: Authenticate with Proxmox
        const response = await axios.post(`${proxmoxUrl}/api2/json/access/ticket`, {
          username,
          password,
        });

        const data = response.data.data;
        setTicket(data.ticket);

        // Step 2: Fetch VNC WebSocket URL
        const vncResponse = await axios.post(
          `${proxmoxUrl}/api2/json/nodes/${node}/qemu/${vmid}/vncproxy`,
          {},
          {
            headers: { Authorization: `PVEAuthCookie=${data.ticket}` },
          }
        );

        const vncData = vncResponse.data.data;
        const { port, ticket: vncTicket } = vncData;

        // Construct WebSocket URL
        setWebSocketUrl(`wss://${proxmoxUrl}:${port}/?vncticket=${vncTicket}`);
      } catch (error) {
        console.error("Error connecting to Proxmox:", error);
      }
    };

    authenticate();
  }, [node, vmid, proxmoxUrl, username, password]);

  return (
    <div>
      {webSocketUrl ? (
        <VncDisplay
          url={webSocketUrl}
          scaleViewport
          background="#000"
          style={{ width: "100%", height: "500px" }}
        />
      ) : (
        <p>Connecting to Proxmox Console...</p>
      )}
    </div>
  );
};

export default ProxmoxConsole;
