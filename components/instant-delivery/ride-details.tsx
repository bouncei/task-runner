import { Text, View } from "../Themed";
import tw from "twrnc";

interface RideDetailsProps {
  handleNextStep: () => void;
}

const RideDetails = ({}: RideDetailsProps) => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-xl`}>Next Step: Delivery Details</Text>
    </View>
  );
};
