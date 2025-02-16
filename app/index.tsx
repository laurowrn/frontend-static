import DefaultContainer from "@/components/containers/DefaultContainer";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";

export default function Index() {
  return <Redirect href="/colmeia-reflections" />;
}
