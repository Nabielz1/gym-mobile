import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette, space } from '@/constants/design-tokens';
export function Screen({ title, subtitle, action, children }: PropsWithChildren<{ title: string; subtitle?: string; action?: ReactNode }>) {
  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}><View style={styles.header}><View style={styles.headerCopy}><Text style={styles.title}>{title}</Text>{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}</View>{action}</View>{children}</ScrollView></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: palette.background }, content: { padding: space.lg, paddingBottom: 40, gap: space.md }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: space.sm }, headerCopy: { flex: 1 }, title: { color: palette.ink, fontSize: 24, fontWeight: '800' }, subtitle: { color: palette.muted, fontSize: 13, marginTop: 3 } });
