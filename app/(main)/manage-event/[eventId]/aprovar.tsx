import DefaultContainer from "@/components/containers/DefaultContainer";
import { Fonts } from "@/constants/fonts";
import {
  fontSize,
  horizontalScale,
  verticalScale,
} from "@/helpers/responsiveScaling";
import { Link } from "expo-router";
import { View } from "react-native";
import { Button, Card, IconButton, Text, useTheme } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
import RequestApprovalCard from "@/components/event/RequestApprovalCard";
import { FlatList } from "react-native";
import React, { useState } from "react";

export default function Approvals() {
  const { colors } = useTheme();
  const [requests, setRequests] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      instagram: "johndoe",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      instagram: "janesmith",
    },
    {
      id: "3",
      name: "Lauro Weingartner Neto",
      email: "lauro.neto@example.com",
      instagram: "laur0wn",
    },
  ]);
  return (
    <DefaultContainer>
      <View
        style={{
          width: "100%",
          alignItems: "center",
        }}
      >
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RequestApprovalCard
              name={item.name}
              email={item.email}
              instagram={item.instagram}
              onApprove={() => {
                setRequests((prev) => prev.filter((req) => req.id !== item.id));
              }}
              onReject={() => {
                setRequests((prev) => prev.filter((req) => req.id !== item.id));
              }}
            />
          )}
          contentContainerStyle={{ gap: verticalScale(10) }}
          style={{
            width: "100%",
          }}
          scrollEnabled={true}
        />
      </View>
    </DefaultContainer>
  );
}
