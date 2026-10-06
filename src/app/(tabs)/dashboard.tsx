import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { BarChart3, Bell, CreditCard, UserPlus, Users } from 'lucide-react-native';

import { GymCard } from '@/components/ui/gym-card';
import { palette, radius, space } from '@/constants/design-tokens';
import { useRepositoryData } from '@/hooks/use-repository-data';
import { gymRepository } from '@/services/gym';
import { formatRupiah } from '@/utils/format';

export default function DashboardScreen() {
  const loader = useCallback(() => gymRepository.getDashboardSummary(), []);
  const { data } = useRepositoryData(loader, { revenueToday: 0, transactionsToday: 0, activeMembers: 0, expiringMembers: 0 });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View><Text style={styles.greeting}>Selamat pagi,</Text><Text style={styles.name}>Budi Santoso 👋</Text></View>
          <Pressable style={styles.notification}><Bell size={21} color={palette.ink} strokeWidth={1.8} /><View style={styles.dot} /></Pressable>
        </View>

        <View style={styles.kpiGrid}>
          <KpiCard label="Member Aktif" value={String(data.activeMembers)} footnote="+2 bulan ini" positive />
          <KpiCard label="Hampir Habis" value={String(data.expiringMembers)} footnote="dalam 7 hari" warning />
          <GymCard style={styles.kpiCard}><Text style={styles.kpiLabel}>Pendapatan Hari Ini</Text><Text style={styles.moneyValue}>{formatRupiah(data.revenueToday)}</Text><MiniTrend /></GymCard>
          <KpiCard label="Walk-in Hari Ini" value="" footnote={formatRupiah(55000)} positive />
        </View>

        <GymCard>
          <Text style={styles.sectionEyebrow}>RINGKASAN TRANSAKSI HARI INI-</Text>
          <View style={styles.summaryGrid}>
            <Summary label="Keanggotaan Baru" value={formatRupiah(1500000)} count="2 transaksi" />
            <Summary label="Perpanjangan" value={formatRupiah(400000)} count="1 transaksi" />
            <Summary label="Walk-in" value={formatRupiah(55000)} count="2 transaksi" />
            <Summary label="Total Transaksi" value={formatRupiah(data.revenueToday)} count={String(data.transactionsToday) + ' transaksi'} />
          </View>
        </GymCard>

        <GymCard>
          <Text style={styles.sectionEyebrow}>AKSI CEPAT</Text>
          <View style={styles.quickRow}>
            <QuickAction icon={UserPlus} label={'Tambah\nMember'} color="#7C3AED" />
            <QuickAction icon={CreditCard} label={'Transaksi\nBaru'} color="#0891B2" />
            <QuickAction icon={Users} label={'Daftar\nMember'} color="#6D28D9" />
            <QuickAction icon={BarChart3} label="Laporan" color="#EC4899" />
          </View>
        </GymCard>

        <GymCard style={styles.trendCard}>
          <View style={styles.trendHeader}><Text style={styles.trendTitle}>Tren Pendapatan</Text><View style={styles.periods}><Text style={styles.periodActive}>Harian</Text><Text style={styles.period}>Mingguan</Text><Text style={styles.period}>Bulanan</Text></View></View>
          <MiniTrend large />
        </GymCard>
      </ScrollView>
    </SafeAreaView>
  );
}

function KpiCard({ label, value, footnote, positive, warning }: { label: string; value: string; footnote: string; positive?: boolean; warning?: boolean }) {
  return <GymCard style={styles.kpiCard}><Text style={styles.kpiLabel}>{label}</Text>{value ? <Text style={[styles.kpiValue, warning && styles.warning]}>{value}</Text> : <View style={styles.valueSpacer} />}<Text style={[styles.footnote, positive && styles.positive]}>{footnote}</Text></GymCard>;
}

function Summary({ label, value, count }: { label: string; value: string; count: string }) {
  return <View style={styles.summaryItem}><Text style={styles.summaryLabel}>{label}</Text><Text style={styles.summaryValue}>{value}</Text><Text style={styles.summaryCount}>{count}</Text></View>;
}

function QuickAction({ icon: Icon, label, color }: { icon: typeof UserPlus; label: string; color: string }) {
  return <Pressable style={({ pressed }) => [styles.quickAction, pressed && styles.pressed]}><Icon size={22} color={color} strokeWidth={2.2} /><Text style={styles.quickLabel}>{label}</Text></Pressable>;
}

function MiniTrend({ large = false }: { large?: boolean }) {
  return <Svg width="100%" height={large ? 76 : 42} viewBox="0 0 120 44"><Path d="M3 36 L22 28 L39 32 L57 27 L72 19 L88 7 L105 13 L117 18" fill="none" stroke={palette.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></Svg>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F7F7F8' },
  content: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 26, gap: 12 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 },
  greeting: { color: '#9295A6', fontSize: 11 },
  name: { color: palette.ink, fontSize: 18, lineHeight: 24, fontWeight: '800' },
  notification: { width: 42, height: 42, borderRadius: 13, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#ECECEF' },
  dot: { position: 'absolute', top: 9, right: 9, width: 7, height: 7, borderRadius: 4, backgroundColor: palette.primary, borderWidth: 1.5, borderColor: 'white' },
  kpiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  kpiCard: { width: '48.4%', minHeight: 106, padding: 14, justifyContent: 'space-between' },
  kpiLabel: { color: '#9195AA', fontSize: 10.5, fontWeight: '500' },
  kpiValue: { color: palette.ink, fontSize: 22, fontWeight: '800', marginVertical: 2 },
  moneyValue: { color: palette.ink, fontSize: 15, fontWeight: '800', marginTop: 6 },
  valueSpacer: { height: 22 },
  warning: { color: '#F59E0B' },
  footnote: { color: '#9295A6', fontSize: 10 },
  positive: { color: '#00B94F' },
  sectionEyebrow: { color: '#979AAC', fontSize: 10, fontWeight: '800', letterSpacing: 0.25, marginBottom: 12 },
  summaryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  summaryItem: { width: '48%', minHeight: 67, padding: 11, backgroundColor: '#F8F8F9', borderRadius: radius.md },
  summaryLabel: { color: '#9295A6', fontSize: 8.5 },
  summaryValue: { color: palette.ink, fontSize: 12.5, fontWeight: '800', marginTop: 6 },
  summaryCount: { color: '#A4A6B2', fontSize: 8.5, marginTop: 3 },
  quickRow: { flexDirection: 'row', gap: 8 },
  quickAction: { flex: 1, minHeight: 70, backgroundColor: '#FAFAFB', borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 7 },
  quickLabel: { color: palette.ink, fontSize: 9, fontWeight: '700', lineHeight: 12, textAlign: 'center' },
  pressed: { opacity: 0.65 },
  trendCard: { minHeight: 128 },
  trendHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  trendTitle: { color: palette.ink, fontSize: 13, fontWeight: '800' },
  periods: { flexDirection: 'row', alignItems: 'center', gap: space.sm },
  period: { color: '#A1A1AA', fontSize: 9 },
  periodActive: { color: 'white', backgroundColor: palette.ink, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7, fontSize: 9, fontWeight: '700', overflow: 'hidden' },
});
