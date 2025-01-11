import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [identity, setIdentity] = useState("");

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostIdentity);
        setToken(viewerToken);

        if (!viewerToken) return;

        const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };
        console.log("decodedToken", decodedToken);
        const name = decodedToken.name;
        const identity = decodedToken.sub;
        if (name) setName(name);
        if (identity) setIdentity(identity);
      } catch {
        toast.error("Failed to create viewer token");
      }
    };
    createToken();
  }, [hostIdentity]);

  return { token, name, identity };
};
