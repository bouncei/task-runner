import tw from "twrnc";

import { Text, View } from "@/components/Themed";
import FrameWithHeader from "@/components/wrappers/frame-with-header";
import { TouchableOpacity } from "react-native";
import NotificationCard from "@/components/cards/notification-card";

const dummyNotifications = [
  {
    id: 1,
    title: "Notification 1",
    description:
      "Our dedicated customer support is here to assist you find your car",
    date: "2022-01-01",
    type: "success",
  },
  {
    id: 2,
    title: "Notification 2",
    description: "This is a notification 2",
    date: "2022-01-02",
    type: "error",
  },
  {
    id: 3,
    title: "Notification 3",
    description: "This is a notification 3",
    date: "2022-01-03",
    type: "warning",
  },
  {
    id: 4,
    title: "Notification 4",
    description: "This is a notification 4",
    date: "2022-01-04",
    type: "success",
  },
];

const NotificationsScreen = () => {
  return (
    <FrameWithHeader showBack title="Notifications">
      <TouchableOpacity>
        <Text
          style={tw` w-full text-right
        `}
        >
          See all
        </Text>
      </TouchableOpacity>
      <View style={tw`flex flex-col py-2 gap-3`}>
        {dummyNotifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            title={notification.title}
            description={notification.description}
            date={notification.date}
            type={notification.type}
          />
        ))}
      </View>
    </FrameWithHeader>
  );
};

export default NotificationsScreen;
