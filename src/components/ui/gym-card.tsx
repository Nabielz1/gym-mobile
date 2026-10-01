import type { PropsWithChildren } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import { palette, radius, space } from '@/constants/design-tokens';
export function GymCard({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) { return <View style={[styles.card, style]}>{children}</View>; }
const styles = StyleSheet.create({ card: { backgroundColor: palette.surface, borderRadius: radius.lg, padding: space.lg, borderWidth: 1, borderColor: palette.border } });
