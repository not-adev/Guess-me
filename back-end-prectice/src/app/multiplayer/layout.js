import { GroupMemberProvider } from "./context/GroupMemberContext";
import { SocketContextProvider } from "./context/SocketContext";
// import { PokemonProvider } from "../context/PokemonContext";
export default function MultiplayerLayout({ children }) {
  return (
    <section>
      <GroupMemberProvider>
        <SocketContextProvider>
            <div>{children}</div>
        </SocketContextProvider>
      </GroupMemberProvider>


    </section>
  );
}