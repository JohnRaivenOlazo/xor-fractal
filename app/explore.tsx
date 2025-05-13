import { ScrollView, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  FadeIn,
  SlideInRight,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function ExploreScreen() {
  const rules = [
    { title: 'Left 0, Right 0', result: '→ 0', example: '0 ⊕ 0 = 0' },
    { title: 'Left 0, Right 1', result: '→ 1', example: '0 ⊕ 1 = 1' },
    { title: 'Left 1, Right 0', result: '→ 1', example: '1 ⊕ 0 = 1' },
    { title: 'Left 1, Right 1', result: '→ 0', example: '1 ⊕ 1 = 0' },
  ];

  const ruleCardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(1) }],
    opacity: withSpring(1),
  }));

  return (
    <View className="flex-1 bg-[#181824]">
      <BlurView
        intensity={30}
        tint="dark"
        className="mt-[10%] mx-[5%] py-4 px-4 items-center rounded-2xl bg-[rgba(24,24,36,0.85)] shadow-md"
      >
        <Animated.View
          entering={FadeIn.duration(1000)}
          className="w-full items-center"
        >
          <Text className="text-white text-[26px] font-bold mb-1 tracking-[0.5px]">
            Rule 90 Explained
          </Text>
          <Text className="text-[#b0b0c3] text-[13px] font-normal tracking-[0.5px]">
            XOR Pattern Generation
          </Text>
        </Animated.View>
      </BlurView>

      <ScrollView className="flex-1 bg-transparent" contentContainerStyle={{ padding: 12, gap: 12 }}>
        <Animated.View entering={SlideInRight.delay(200).springify()}>
          <AnimatedBlurView
            intensity={30}
            tint="dark"
            className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] mb-3"
          >
            <Text className="text-white text-[20px] font-semibold mb-2 tracking-[0.1px]">
              What is Rule 90?
            </Text>
            <Text className="text-[#b0b0c3] text-[15px] leading-[22px] font-normal">
              Rule 90 is an elementary cellular automaton that creates patterns
              using the XOR (exclusive OR) operation. Each cell's next state is
              determined by XORing its left and right neighbors.
            </Text>
          </AnimatedBlurView>
        </Animated.View>

        <Animated.View entering={SlideInRight.delay(400).springify()}>
          <AnimatedBlurView intensity={30} className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] mb-3">
            <Text className="text-white text-[20px] font-semibold mb-2 tracking-[0.1px]">
              The Rules
            </Text>
            <View className="flex-row flex-wrap gap-2 mt-2">
              {rules.map((rule, index) => (
                <Animated.View
                  key={index}
                  style={ruleCardAnimatedStyle}
                  entering={FadeIn.delay(600 + index * 100)}
                  className="flex-1 min-w-[120px] p-3 bg-[rgba(59,130,246,0.08)] rounded-lg"
                >
                  <Text className="text-[#b0b0c3] text-[13px] font-medium mb-1">
                    {rule.title}
                  </Text>
                  <Text className="text-[#3b82f6] text-[16px] font-bold mb-1">
                    {rule.result}
                  </Text>
                  <Text className="text-[#b0b0c3] text-[11px] font-mono opacity-70">
                    {rule.example}
                  </Text>
                </Animated.View>
              ))}
            </View>
          </AnimatedBlurView>
        </Animated.View>

        <Animated.View entering={SlideInRight.delay(600).springify()}>
          <AnimatedBlurView intensity={30} className="p-4 rounded-xl bg-[rgba(255,255,255,0.03)] mb-3">
            <Text className="text-white text-[20px] font-semibold mb-2 tracking-[0.1px]">
              Example Patterns
            </Text>
            <View className="gap-2 mt-1">
              <View className="p-3 bg-[rgba(52,211,153,0.08)] rounded-lg">
                <Text className="text-[#b0b0c3] text-[14px] font-medium mb-1">
                  Basic Triangle
                </Text>
                <Text className="text-[#34d399] text-[18px] font-mono tracking-[2px]">
                  00100
                </Text>
              </View>
              <View className="p-3 bg-[rgba(52,211,153,0.08)] rounded-lg">
                <Text className="text-[#b0b0c3] text-[14px] font-medium mb-1">
                  Split Pattern
                </Text>
                <Text className="text-[#34d399] text-[18px] font-mono tracking-[2px]">
                  00110
                </Text>
              </View>
              <View className="p-3 bg-[rgba(52,211,153,0.08)] rounded-lg">
                <Text className="text-[#b0b0c3] text-[14px] font-medium mb-1">
                  Diamond
                </Text>
                <Text className="text-[#34d399] text-[18px] font-mono tracking-[2px]">
                  01010
                </Text>
              </View>
            </View>
          </AnimatedBlurView>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
