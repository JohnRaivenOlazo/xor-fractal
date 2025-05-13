import { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Pressable, useWindowDimensions, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withSpring,
  FadeIn,
  SlideInDown,
  useSharedValue,
} from 'react-native-reanimated';

const CELL_SIZE = 45;
const CELL_MARGIN = 2;
const DEFAULT_WIDTH = 5;
const MIN_SIZE = 1;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AnimatedCellProps {
  value: number;
  onPress: () => void;
}

// Create a reusable animated cell component
const AnimatedCell = ({ value, onPress }: AnimatedCellProps) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(value ? 1 : 0.97) }],
    opacity: withSpring(value ? 1 : 0.5),
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      className="rounded-lg overflow-hidden"
      style={animatedStyle}
    >
      <BlurView
        intensity={value ? 60 : 10}
        tint="dark"
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
          backgroundColor: value ? 'rgba(59,130,246,0.7)' : 'rgba(30,30,40,0.7)',
          borderWidth: value ? 0 : 1,
          borderColor: 'rgba(80,80,100,0.3)',
          shadowColor: '#000',
          shadowOpacity: value ? 0.2 : 0,
          shadowRadius: 4,
        }}
      >
        <Text className="text-white text-center pt-3">{value}</Text>
      </BlurView>
    </AnimatedPressable>
  );
};

export default function HomeScreen() {
  const scale = useSharedValue(1);
  const [cells, setCells] = useState<number[][]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [size, setSize] = useState(DEFAULT_WIDTH);
  const [sizeInput, setSizeInput] = useState(DEFAULT_WIDTH.toString());
  const timerRef = useRef<number | null>(null);
  const { width: windowWidth } = useWindowDimensions();

  const initializeCells = () => {
    const firstRow = new Array(size).fill(0);
    firstRow[Math.floor(size / 2)] = 1;
    setCells([firstRow]);
  };

  const step = (oldRow: number[]) => {
    const newRow = new Array(size).fill(0);
    for (let i = 1; i < size - 1; i++) {
      newRow[i] = oldRow[i - 1] ^ oldRow[i + 1];
    }
    return newRow;
  };

  const updateFractal = () => {
    setCells(prevCells => {
      // Stop if we've reached the size limit
      if (prevCells.length >= size) {
        if (timerRef.current !== null) clearInterval(timerRef.current);
        setIsRunning(false);
        return prevCells;
      }

      const lastRow = prevCells[prevCells.length - 1];
      const newRow = step(lastRow);
      return [...prevCells, newRow];
    });
  };

  useEffect(() => {
    if (isRunning) {
      // Only start interval if we haven't reached the size limit
      if (cells.length < size) {
        timerRef.current = setInterval(updateFractal, speed) as unknown as number;
      } else {
        setIsRunning(false);
      }
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, speed, size]);

  // Reset when size changes
  useEffect(() => {
    setIsRunning(false);
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    initializeCells();
  }, [size]);

  const handleCellPress = async (rowIndex: number, cellIndex: number) => {
    if (rowIndex !== 0 || isRunning) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    setCells(prev => {
      const newFirstRow = [...prev[0]];
      newFirstRow[cellIndex] = newFirstRow[cellIndex] ? 0 : 1;
      return [newFirstRow]; // Only keep first row when editing
    });
  };

  const handleSizeChange = (newSize: number) => {
    // Only enforce minimum size and maximum of 20
    const clampedSize = Math.min(20, Math.max(MIN_SIZE, newSize));
    setSizeInput(clampedSize.toString());
    setSize(clampedSize);
    setIsRunning(false);
    // initializeCells(); // Not needed, handled by useEffect
  };

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.min(Math.max(e.scale, 0.2), 5);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  const calculatedPadding = Math.max(15, (windowWidth - (CELL_SIZE + (CELL_MARGIN * 2)) * size) / 2);

  // Calculate if content width exceeds screen width
  const contentWidth = (CELL_SIZE + (CELL_MARGIN * 2)) * size;
  const shouldScroll = contentWidth > windowWidth;

  return (
    <SafeAreaView className="flex-1 bg-[#181824]">
      <View className="flex-1 bg-transparent">
        <StatusBar style="light" />
        <BlurView intensity={40} tint="dark" className="mt-[8%] mx-[5%] py-4 px-5 items-center rounded-[20px] shadow-lg bg-[rgba(24,24,36,0.7)] border-b-0">
          <Animated.View entering={FadeIn.duration(1000)} className="w-full items-center">
            <Text className="text-[28px] font-bold text-white tracking-wider">Rule 90</Text>
            <Text className="text-[14px] text-[#b0b0c3] font-normal mt-0.5">Elementary Cellular Automaton</Text>
          </Animated.View>
        </BlurView>
        <Animated.View
          entering={SlideInDown.delay(300).springify()}
          className="p-4 bg-transparent mb-2"
        >
          <View className="flex-col gap-3">
            <View className="flex-row justify-between gap-2">
              <AnimatedPressable
                className={`flex-1 rounded-lg px-4 py-3 items-center ${isRunning ? 'bg-[#e94560]' : 'bg-[#3b82f6]'}`}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  setIsRunning(!isRunning);
                }}
              >
                <Text className="text-white font-semibold text-[15px] tracking-wider">
                  {isRunning ? 'Stop' : 'Start'}
                </Text>
              </AnimatedPressable>
              <AnimatedPressable
                className="flex-1 rounded-lg px-4 py-3 items-center bg-[#232336]"
                onPress={() => {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                  setIsRunning(false);
                  initializeCells();
                }}
              >
                <Text className="text-[#b0b0c3] font-semibold text-[15px]">Reset</Text>
              </AnimatedPressable>
            </View>
            <BlurView intensity={30} tint="dark" className="rounded-lg bg-[rgba(24,24,36,0.7)] border-0 p-3">
              <View className="flex-row items-center justify-between">
                <Text className="text-[#b0b0c3] text-[13px]">Grid Size</Text>
                <View className="flex-row items-center gap-3 bg-transparent">
                  <Pressable
                    className="w-8 h-8 items-center justify-center bg-[#232336] rounded-md"
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      handleSizeChange(size - 1);
                    }}
                  >
                    <Text className="text-[#b0b0c3] text-lg">−</Text>
                  </Pressable>
                  <Text className="text-white font-semibold text-base min-w-[24px] text-center">{size}</Text>
                  <Pressable
                    className="w-8 h-8 items-center justify-center bg-[#232336] rounded-md"
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      handleSizeChange(size + 1);
                    }}
                  >
                    <Text className="text-[#b0b0c3] text-lg">+</Text>
                  </Pressable>
                </View>
              </View>
            </BlurView>
          </View>
        </Animated.View>
        <ScrollView
          className="bg-transparent"
          contentContainerStyle={{
            paddingHorizontal: calculatedPadding,
            paddingVertical: 20,
          }}
          horizontal={shouldScroll}
          showsHorizontalScrollIndicator={false}
        >
          <GestureDetector gesture={pinchGesture}>
            <Animated.View
              style={[
                shouldScroll && { paddingRight: calculatedPadding },
                animatedStyle
              ]}
              className="bg-transparent gap-[2px] flex-col"
            >
              {cells.map((row, rowIndex) => (
                <View key={rowIndex} className="flex-row gap-[2px]">
                  {row.map((cell, cellIndex) => (
                    <AnimatedCell
                      key={`${rowIndex}-${cellIndex}`}
                      value={cell}
                      onPress={() => handleCellPress(rowIndex, cellIndex)}
                    />
                  ))}
                </View>
              ))}
            </Animated.View>
          </GestureDetector>
        </ScrollView>

        <BlurView intensity={20} tint="dark" className="bg-[rgba(24,24,36,0.7)] border-t-0 mt-2 py-4">
          <Text className="text-[#b0b0c3] text-[13px] text-center tracking-wider">
            Tap first row cells to toggle bits
          </Text>
        </BlurView>
      </View>
    </SafeAreaView>
  );
}
