import DefaultContainer from "@/components/containers/DefaultContainer";
import { View, Text, TouchableOpacity } from "react-native";
import { useSession } from "@/context/AuthContext"; // Adjust the import path
import { useRouter } from "expo-router";

export default function Logout() {
  const { signOut } = useSession();
  const router = useRouter();
  return (
    <DefaultContainer>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white" }}>Rota autenticada.</Text>
        <TouchableOpacity
          style={{ backgroundColor: "white", padding: 30 }}
          onPress={() => {
            signOut();
            router.replace("/login");
          }}
        >
          <Text>Sign-out</Text>
        </TouchableOpacity>
      </View>
    </DefaultContainer>
  );
}
