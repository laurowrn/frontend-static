import { Payment } from "@mercadopago/sdk-react";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function CheckoutMercadoPago() {
  const router = useRouter();
  return (
    <View>
      <Payment
        initialization={{
          amount: 10,
        }}
        onSubmit={async (param) => {
          console.log(
            "Dados enviados ao backend:",
            JSON.stringify(param.formData, null, 2)
          );
          fetch("http://localhost:3001/process_payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(param.formData),
          })
            .then((response) => response.json())
            .then((response) => {
              if (response.status === "approved") {
                router.push("/success");
              } else if (response.status === "rejected") {
                router.push(`/error?message=${response.message}`);
              }
            })
            .catch((error: any) => {
              router.push(`/error?message=${error.message}`);
            });
        }}
        customization={{
          visual: {
            style: {
              theme: "dark",
            },
          },
          paymentMethods: {
            creditCard: "all",
            bankTransfer: "all",
            atm: "all",
            maxInstallments: 1,
          },
        }}
      />
    </View>
  );
}
