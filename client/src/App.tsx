import { useState } from "react";

import Chat from "@sellia/components/Chat/Chat";
import RegisterAuthor from "@sellia/components/RegisterAuthor/RegisterAuthor";

function App() {
  const [hasSessionStarted, setHasSessionStarted] = useState(
    !!sessionStorage.id
  );

  return hasSessionStarted ? (
    <Chat />
  ) : (
    <RegisterAuthor
      onSessionStarted={() => {
        setHasSessionStarted(true);
      }}
    />
  );
}

export default App;
