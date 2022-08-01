import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

const Words = ({ navigation }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("use-effect-1-count: " + count);
    return () => {
      // setCount(0);
    };
  });

  useEffect(() => {
    console.log("use-effect-2-count: " + count);
  });

  return (
    <View>
      <Text>${count}</Text>
      <Button onPress={() => setCount(count + 1)} title="Increase Count"/>
    </View>
  );
};
export default Words;