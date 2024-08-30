import React from "react";
import tw from "twrnc";

import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { Text } from "@/components/Themed";
import TransactionCard from "@/components/cards/transaction-card";

const dummyTransactions = [
  {
    location: "Berlin Central Station",
    date: "20 Oct, 2:00",
    amount: "#4000",
  },
  {
    location: "Gotthardstraße 71",
    date: "10 Oct, 19:00",
    amount: "#3,000",
  },
  {
    location: "S Postdamer Platz",
    date: "15 Sept, 7:00",
    amount: "#1,200",
  },
  // Add more transactions here...
];

const MyRidersScreen = () => {
  return (
    <FrameWithHeader showBack title="My Riders">
      <Text style={tw`text-xl font-bold mt-4 `}>Oct 2023</Text>
      {dummyTransactions.map((transaction, index) => (
        <TransactionCard
          key={index}
          location={transaction.location}
          date={transaction.date}
          amount={transaction.amount}
        />
      ))}

      {/* Repeat for other months with a new section header */}
      <Text style={tw`text-xl font-bold mt-4 `}>Sept 2023</Text>
      {dummyTransactions.map((transaction, index) => (
        <TransactionCard
          key={index}
          location={transaction.location}
          date={transaction.date}
          amount={transaction.amount}
        />
      ))}
    </FrameWithHeader>
  );
};

export default MyRidersScreen;
