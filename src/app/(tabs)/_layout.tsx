import { Tabs } from 'expo-router';
import { BarChart3, CreditCard, LayoutGrid, Menu, Users } from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import { palette } from '@/constants/design-tokens';

const icons = { dashboard: LayoutGrid, members: Users, transactions: CreditCard, reports: BarChart3, more: Menu };

export default function TabsLayout() {
  return (
    <Tabs screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: palette.primary,
      tabBarInactiveTintColor: palette.subtle,
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.label,
      tabBarIcon: ({ color }) => {
        const Icon = icons[route.name as keyof typeof icons];
        return <Icon color={color} size={20} strokeWidth={1.8} />;
      },
    })}>
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="members" options={{ title: 'Member' }} />
      <Tabs.Screen name="transactions" options={{ title: 'Transaksi' }} />
      <Tabs.Screen name="reports" options={{ title: 'Laporan' }} />
      <Tabs.Screen name="more" options={{ title: 'Lainnya' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({ tabBar: { height: 64, paddingTop: 7, paddingBottom: 7, borderTopColor: palette.border, backgroundColor: palette.surface }, label: { fontSize: 9, fontWeight: '600' } });
