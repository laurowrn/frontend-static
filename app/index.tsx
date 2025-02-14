import DefaultContainer from "@/components/containers/DefaultContainer";
import EventPage from "@/pages/EventPage";
import ValidationPage from "@/pages/ValidationPage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      router.replace("/colmeia-reflections");
    }
  }, [isMounted, router]);

  return (
    <DefaultContainer>
      <Text>Redirecting...</Text>
    </DefaultContainer>
  );
}
